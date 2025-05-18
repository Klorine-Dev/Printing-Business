try{
//-----------------
const ani={
  duration:.25,
  ease:"easeInOut",
};
let card=document.getElementById("card");
const currentlyEditing=document.getElementById("currentlyEditing");
let ie={
  name:document.getElementById("name"),
  idnum:document.getElementById("idnum"),
  gradyear:document.getElementById("gradyear"),
  imgsrc:document.getElementById("imgsrc"),
  logosrc:document.getElementById("logosrc"),
  bgsrc:document.getElementById("bgsrc"),
  cbgclr:document.getElementById("cbgclr"),
  tbgclr:document.getElementById("tbgclr"),
  dbgclr:document.getElementById("dbgclr"),
  schoolname:document.getElementById("schoolname"),
  schoollevel:document.getElementById("schoollevel"),
};
$(document).on('change', 'input[type=color]', function() {
  this.parentNode.style.backgroundColor = this.value;
});
const cardback=document.getElementById("cardback");
const ss=document.getElementById("switchSides");
const cb={
  standard:document.getElementById("scheduleTable"),
  custom:document.getElementById("customSchedule"),
  customEdit:document.getElementById("customEdit"),
};
document.getElementById("cardBackType").addEventListener("change",(e)=>{
  Object.values(cb).map(item=>{
    // animate(item,{opacity:0,},ani);
    item.classList.add("hidden");
  });
  // console.log(e.target.value);
  // animate(cb[e.target.value],{
    // opacity: 0,
  // },ani);
  cb[e.target.value].classList.remove("hidden");
  e.target.blur();
  switch(e.target.value){
    case "custom":
      cb.customEdit.classList.remove("hidden");
      cb.customEdit.setAttribute("style","opacity:0;");
      animate(cb.customEdit,{
        opacity:1,
        // height:100,
      },ani);
    break;
    default:
      cb.customEdit.classList.add("hidden");
      console.log("no callback for cardback");
  }
});
ss.addEventListener("load",()=>{
  ss.createAttribute("EditingFront");
  ss.setAttribute("EditingFront","true");
});
document.getElementById("theme").addEventListener("change",(e)=>{try{
  card.className=e.target.value;
  switch(e.target.value){
    case "customcss":
      let fi=document.createElement("input");
      fi.setAttribute("type","file");
      fi.setAttribute("accept",".css");
      fi.addEventListener("change",(e)=>{
        // alert(e.target.value);
        var file=e.target.files[0];
        var reader=new FileReader();
        reader.onloadend=()=>{
          // alert(reader.result);
          let ns=document.createElement("style");
          ns.innerHTML=`.customcss{
            :not(
              #editCard,
              #editCard *,
              #advancedEdit,
              #advancedEdit *
            ){
              ${reader.result}
            }
          }`;
          ns.setAttribute("id","customcss");
          document.head.append(ns);
          fi.remove();
        };
        if(file)reader.readAsText(file);
      });
      fi.click();
    break;
    default:
      // alert("no callback for theme");
  }
  e.target.blur();
}catch(e){alert(e);}});
ss.addEventListener("click",(e)=>{
  e.preventDefault();
  ss.setAttribute("EditingFront",
    ss.getAttribute("EditingFront")=="true"?
    "false":"true");
  animate([
    [currentlyEditing,
    {"--blur":"1rem",y:-150,opacity:0,scale:1.25,},
    {duration:.25}],
    [currentlyEditing,
    {"--blur":"0rem",y:0,opacity:1,scale:1,},
    {duration:.25}],
  ],{...ani,duration:.5})
  switch(ss.getAttribute("EditingFront")){
    case "true":
      animate(document.getElementById("cardShadow"),{
        opacity:0,
      },{...ani,duration:.15});
      animate(card,{
        y:20,
        opacity:0,
        scale:.75,
        "--blur":"1rem",
      },ani);
      animate(cardback,{
        y:0,
        opacity:1,
        scale:1,
        "--blur":"0rem",
      },ani);
      setTimeout(()=>{
        animate(document.getElementById("cardShadow"),{
          opacity:1,
        },{...ani,delay:.35,duration:.35});
      },100);
      currentlyEditing.innerHTML="Back";
      cardback.classList.remove("disabled");
      card.classList.add("disabled");
    break;
    case "false":
      animate(document.getElementById("cardShadow"),{
        opacity:1,
      },{...ani,delay:.35,duration:.35});
      animate(card,{
        y:0,
        opacity:1,
        scale:1,
        "--blur":"0rem",
      },ani);
      animate(cardback,{
        y:20,
        opacity:0,
        scale:.75,
        "--blur":"1rem",
      },ani);
      setTimeout(()=>{
        animate(document.getElementById("cardShadow"),{
          opacity:1,
        },{...ani,delay:.35,duration:.35});
      },100);
      currentlyEditing.innerHTML="Front";
      cardback.classList.add("disabled");
      card.classList.remove("disabled");
    break;
    default:console.error("unknown state");
  }
});
document.getElementById("backtomain").addEventListener("click",(e)=>{
  e.preventDefault();
  document.getElementById("editCard").classList.remove("disabled");
  document.getElementById("advancedEdit").classList.add("disabled");
  animate(document.getElementById("advancedEdit"),{
    x:75,
    opacity:0,
    scale: 1.25,
    "--blur":"1rem",
  },ani);
  animate(document.getElementById("editCard"),{
    x:0,
    opacity:1,
    scale:1,
    "--blur":"0rem",
  },ani);
});
document.getElementById("advanced").addEventListener("click",(e)=>{
  e.preventDefault();
  document.getElementById("editCard").classList.add("disabled");
  document.getElementById("advancedEdit").classList.remove("disabled");
  animate(document.getElementById("editCard"),{
    x:-75,
    opacity:0,
    scale:.75,
    "--blur":"1rem",
  },ani);
  animate(document.getElementById("advancedEdit"),{
    x:0,
    opacity:1,
    scale: 1,
    "--blur":"0rem",
  },ani);
});
ie.name.addEventListener("keyup",()=>{
  document.getElementById("cardname").innerText=ie.name.value;});
ie.name.addEventListener("keydown",(e)=>{
  if(e.key=="Enter")ie.idnum.focus();});
function downloadURI(uri, name) {
  var link=document.createElement("a");
  link.download=name;
  link.href=uri;
  link.click();
  //after creating link you should delete dynamic link
  // clearDynamicLink(link); 
}
const RenderBarcode=()=>{
  document.getElementById("barcode").innerText=`*${ie.idnum.value}*`;
}
ie.idnum.addEventListener("keyup",()=>{
  document.getElementById("cardid").innerText=ie.idnum.value;
  //!doesn't work with html2canvas
  // document.getElementById("barcode").style.backgroundImage=`url("https://barcode.tec-it.com/barcode.ashx?data=${ie.idnum.value}&code=Code39")`;
  RenderBarcode();
});
ie.idnum.addEventListener("keydown",(e)=>{
  if(e.key=="Enter")ie.gradyear.focus();});
ie.schoolname.addEventListener("keyup",()=>{
  document.getElementById("logo").setAttribute('data-before',ie.schoolname.value);});
ie.schoollevel.addEventListener("keyup",()=>{
  document.getElementById("logo").setAttribute('data-after',ie.schoollevel.value);});
ie.schoolname.addEventListener("keydown",(e)=>{
  if(e.key=="Enter")ie.schoollevel.focus();});
ie.gradyear.addEventListener("keyup",()=>{
  document.getElementById("cardgradyear").innerText=`Class of ${ie.gradyear.value}`;});
ie.gradyear.addEventListener("keydown",(e)=>{
  if(e.key=="Enter"){
      ie.imgsrc.click();
      e.target.blur();
  }});
ie.imgsrc.addEventListener("change",(e)=>{try{
  var file=e.target.files[0];
  var reader=new FileReader();
  reader.onloadend=()=>
      document.getElementById("pfp").style.backgroundImage=`url("${reader.result}")`;
  if(file)reader.readAsDataURL(file);
}catch(e){alert(e);}});
ie.logosrc.addEventListener("change",(e)=>{try{
  var file=e.target.files[0];
  var reader=new FileReader();
  reader.onloadend=()=>
      document.getElementById("logo").style.backgroundImage=`url("${reader.result}")`;
  if(file)reader.readAsDataURL(file);
}catch(e){alert(e);}});
ie.dbgclr.addEventListener("change",()=>{
  document.getElementById("datacontainer").style.background=ie.dbgclr.value;});
ie.tbgclr.addEventListener("change",()=>{
  document.getElementById("textcontainer").style.background=ie.tbgclr.value;});
ie.cbgclr.addEventListener("change",()=>{
  card.style.background=ie.cbgclr.value;});
ie.bgsrc.addEventListener("change",(e)=>{try{
  var file=e.target.files[0];
  var reader=new FileReader();
  reader.onloadend=()=>
    card.style.backgroundImage=`url("${reader.result}")`;
  if(file)reader.readAsDataURL(file);
}catch(e){alert(e);}});
document.getElementById("export").addEventListener("click",(e)=>{try{
  e.preventDefault();
  //!works, but no image support
  document.getElementById("barcode").classList.remove("previewMode");
  html2canvas(card,{
    allowTaint: true,
    useCORS:true,
    backgroundColor:null,
  }).then((canvas)=>{
    var myImage=canvas.toDataURL("image/png");
    downloadURI("data:"+myImage,"idphoto.png");
    document.getElementById("barcode").classList.add("previewMode");
  });
  //!works, but translation is broken
  // domtoimage.toPng(card)
    // .then((dataUrl)=>{downloadURI(dataUrl,"idphoto.png");});
}catch(e){alert(e);}});
//-----------------
}catch(e){alert(e);}