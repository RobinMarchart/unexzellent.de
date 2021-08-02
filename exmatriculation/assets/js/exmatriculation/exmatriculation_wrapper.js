
async function load_library(){
  const exmatriculation =await import('assets/js/exmatriculation/exmatriculation.js');
  await exmatriculation.default();
  return exmatriculation.PreparedDocument;
}

async function load_content(url){
  let pdf_response=await fetch(url);
  if(!pdf_response.ok){
    throw "Error fetching "+url+": "+pdf_response.statusText;
  }
  let blob=await pdf_response.blob();
  let buffer=await blob.arrayBuffer();
  return new Uint8Array(buffer);
}

async function document_loader(){
  let promises=await Promise.all([load_library(),load_content('assets/webfonts/LiberationSans-Regular.ttf')]);
  return new promises[0](promises[1]);
}

let base_pdf=null
async function ready_pdf(){
  if(base_pdf===null)base_pdf=document_loader();

  return await base_pdf;

}

function array_to_url(data){
  return URL.createObjectURL(new Blob([data],{type:"application/pdf"}))
}

async function personalized_exmatriculation(firstname,lastname){
  const base_pdf=await ready_pdf()
  return base_pdf.personalize_pdf(firstname,lastname);
}

async function personalized_exmatriculation_url(firstname,lastname){
  return array_to_url(await personalized_exmatriculation(firstname,lastname));
}

function exmatriculate(firstname,lastname){
  personalized_exmatriculation_url(firstname,lastname).then(
    url=>document.location=url,
    error=>{
      console.error(error);
      alert(error);
    },
  );
}
window.exmatriculate=exmatriculate;
document.getElementById("unexzellent").onclick=()=>exmatriculate("James","Pond");
