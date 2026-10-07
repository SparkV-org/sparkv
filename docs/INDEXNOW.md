# IndexNow

IndexNow notifies participating search engines that URLs changed. Protocol (indexnow.org/documentation): key of 8-128 chars (a-z, A-Z, 0-9, dash); a UTF-8 text file `{key}.txt` at the site root containing the key; JSON POST with `host`, `key`, `keyLocation`, `urlList` (max 10,000 URLs). Responses: 200/202 ok, 400 bad format, 403 key not validated, 422 URL/host mismatch, 429 rate limited.

## Files

- `public/a1298ebba9a0e3a44e15c1c4fe25fd3a.txt` - the key file, served at `https://www.sparkv.si/a1298ebba9a0e3a44e15c1c4fe25fd3a.txt`. Public by design: it only proves you control the host. It is not a secret; do not reuse it as one.
- `scripts/indexnow.mjs` - no dependencies, Node 22.

## Usage

```
node scripts/indexnow.mjs                 # dry run, URLs from https://www.sparkv.si/sitemap.xml
node scripts/indexnow.mjs --urls https://www.sparkv.si/,https://www.sparkv.si/services
node scripts/indexnow.mjs --submit        # actually POST to https://api.indexnow.org/indexnow
```

Dry run is the default and prints the exact payload. Every URL must be https on `www.sparkv.si`, otherwise the script aborts. It prints the HTTP status on submit.

## When to run

After a production deploy that adds, changes or deletes URLs (deleted URLs are reported too). The key file must already be live (deployed) before submitting, or you will get 403. Do not run it on every deploy, and only with the owner's approval since it contacts an external service.

## Who benefits

Bing, Yandex, Seznam, Naver and other participants. Google does not support IndexNow; for Google rely on the sitemap and Search Console.
