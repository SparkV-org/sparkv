"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

export function ContactForm(){
 const [formStep,setFormStep]=useState(0),[sent,setSent]=useState(false),[projectType,setProjectType]=useState(""),[submitting,setSubmitting]=useState(false),[formError,setFormError]=useState("");
 async function submitProject(e:FormEvent<HTMLFormElement>){
  e.preventDefault();setFormError("");setSubmitting(true);
  const form=new FormData(e.currentTarget);
  try{
   const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectType,name:form.get("name"),email:form.get("email"),brief:form.get("brief"),companyWebsite:form.get("companyWebsite")})});
   const result=await response.json() as {error?:string};
   if(!response.ok)throw new Error(result.error||"We could not send your project brief.");
   setSent(true);
  }catch(error){setFormError(error instanceof Error?error.message:"We could not send your project brief.")}
  finally{setSubmitting(false)}
 }
 return <form className="intake" onSubmit={submitProject}>{sent?<div className="form-success" role="status"><span><Check/></span><h3>Project brief delivered.</h3><p>Thanks—SparkV received your project details and can follow up using the email you provided.</p><button type="button" className="button button-dark" onClick={()=>{setSent(false);setFormStep(0);setProjectType("")}}>Start another</button></div>:<><div className="form-progress"><span>PROJECT INTAKE</span><small>STEP {formStep+1} / 2</small><i><b style={{width:formStep?"100%":"50%"}}/></i></div>{formStep===0?<div className="form-panel"><label>What are you looking to build?</label><div className="project-types">{["Website","Web App","Mobile App","AI Agent","Voice Agent","Automation","AI System","Other"].map(x=><label key={x}><input type="radio" name="type" value={x} checked={projectType===x} onChange={()=>setProjectType(x)}/><span>{x}</span></label>)}</div>{formError&&<p className="form-error" role="alert">{formError}</p>}<button type="button" className="button button-dark" disabled={!projectType} onClick={()=>{if(projectType){setFormError("");setFormStep(1)}else setFormError("Choose a project type to continue.")}}>Continue <ArrowRight size={17}/></button></div>:<div className="form-panel fields"><input className="form-honeypot" name="companyWebsite" tabIndex={-1} autoComplete="off" aria-hidden="true"/><label>Name<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your name"/></label><label>Work email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="you@company.com"/></label><label className="full">What are you trying to build?<textarea name="brief" required minLength={10} maxLength={5000} rows={4} placeholder="The problem, current workflow, and what a successful outcome looks like…"/></label>{formError&&<p className="form-error full" role="alert">{formError}</p>}<div className="form-buttons"><button type="button" className="back" disabled={submitting} onClick={()=>setFormStep(0)}>Back</button><button className="button button-dark" disabled={submitting}>{submitting?"Sending…":"Send Project Brief"} {!submitting&&<ArrowUpRight size={17}/>}</button></div></div>}</>}</form>
}
