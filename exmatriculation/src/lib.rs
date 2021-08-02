use wasm_bindgen::prelude::*;
use web_sys::Blob;
use js_sys::Uint8Array;
use printpdf::{PdfDocument, Mm};
use std::io::BufWriter;
use std::io::Write;


#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct PreparedDocument {
    font:Vec<u8>,
}



#[wasm_bindgen]
impl PreparedDocument {
    #[wasm_bindgen(constructor)]
    pub fn from(font:Vec<u8>)->PreparedDocument{
        #[cfg(feature="panic_hook")]
        {
            console_error_panic_hook::set_once();
        }
        PreparedDocument {
            font,
        }
    }

    pub fn personalize_pdf(&self,firstname:&str,lastname:&str)->Result<Vec<u8>,JsValue>{
        let mut output:Vec<u8>=Vec::new();
        let (doc,page_ref,layer_ref)=PdfDocument::new("Unexzellenz",Mm(210.0),Mm(297.0),"no");
        let layer=doc.get_page(page_ref).get_layer(layer_ref);
        let font=doc.add_external_font(&self.font as &[u8]).map_err(|_|"failed to add font to pdf")?;
        layer.use_text(firstname,30.0,Mm(20.0),Mm(150.0),&font);
        layer.use_text(lastname,30.0,Mm(20.0),Mm(110.0),&font);
        let mut writer=BufWriter::new(&mut output);
        doc.save(&mut writer);
        writer.flush().map_err(|_|"unable to flush buffer writer")?;
        drop(writer);
        Ok(output)
    }
}
