#!/usr/bin/env node
// Generates public/intro-voice.mp3 once, so the ElevenLabs key never ships to the browser or the repo.
//
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-intro-voice.mjs
//   (optional) ELEVENLABS_VOICE_ID=<id>   pick a specific voice
//   node scripts/generate-intro-voice.mjs --samples   render one clip per candidate voice into scripts/voice-samples/ to audition
//
// Delivery is tuned for a deep, booming, dramatic read.
// The intro timeline (app/intro.css) lands the brush stroke ~2.2s in, so the line is "Introducing…" + a beat + "Spark V."
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const key = process.env.ELEVENLABS_API_KEY;
if (!key) { console.error("Set ELEVENLABS_API_KEY (the secret key that starts with sk_)."); process.exit(1); }
if (!key.startsWith("sk_")) { console.error("That doesn't look like a secret key. ElevenLabs secret keys start with sk_ (a key *ID* will be rejected)."); process.exit(1); }

const H = { "xi-api-key": key };
const PREFERRED = ["Brian", "Daniel", "Adam", "Josh", "Arnold", "Clyde", "George"]; // deep, dominant premade male voices, in order of preference
const FALLBACK_ID = "nPczCjzI2devNBz1zQrb"; // Brian

async function pickVoice() {
  if (process.env.ELEVENLABS_VOICE_ID) return process.env.ELEVENLABS_VOICE_ID;
  try {
    const r = await fetch("https://api.elevenlabs.io/v1/voices", { headers: H });
    if (r.ok) {
      const { voices = [] } = await r.json();
      for (const name of PREFERRED) { const v = voices.find((x) => x.name?.split(/[ -]/)[0] === name); if (v) { console.log(`Voice: ${v.name}`); return v.voice_id; } }
    }
  } catch {}
  console.log("Voice: Brian (default)");
  return FALLBACK_ID;
}

const TEXT = 'Introducing. <break time="0.9s" /> Spark. Vee.';
async function speak(voice) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { ...H, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text: TEXT,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.35, similarity_boost: 0.9, style: 0.85, use_speaker_boost: true },
    }),
  });
  if (!res.ok) { console.error(`ElevenLabs error ${res.status}: ${await res.text()}`); process.exit(1); }
  return Buffer.from(await res.arrayBuffer());
}

const here = dirname(fileURLToPath(import.meta.url));
if (process.argv.includes("--samples")) {
  const r = await fetch("https://api.elevenlabs.io/v1/voices", { headers: H });
  const { voices = [] } = r.ok ? await r.json() : {};
  const dir = join(here, "voice-samples");
  mkdirSync(dir, { recursive: true });
  for (const name of PREFERRED) {
    const v = voices.find((x) => x.name?.split(/[ -]/)[0] === name);
    if (!v) { console.log(`skip ${name} (not on this account)`); continue; }
    writeFileSync(join(dir, `${name}.mp3`), await speak(v.voice_id));
    console.log(`Wrote scripts/voice-samples/${name}.mp3  (ELEVENLABS_VOICE_ID=${v.voice_id})`);
  }
  console.log("Listen, then re-run without --samples using ELEVENLABS_VOICE_ID=<the one you like>.");
} else {
  const out = join(here, "..", "public", "intro-voice.mp3");
  writeFileSync(out, await speak(await pickVoice()));
  console.log(`Wrote ${out}`);
}
