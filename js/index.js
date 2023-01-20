var finalLink;
var fileName;
const isRequired = value => value === '' ? false : true;

const myForm = document.getElementById('recieptForm');
  myForm.addEventListener('submit', function(event){
    if(myForm.checkValidity() == false)return;
    event.preventDefault();
    $("#downloadable").modal('show');
    const formInputData = new FormData(myForm);
    const  payload = Object.fromEntries(formInputData);
    fileName = payload['name'];
    fetch('https://pdf-gen-jgdq.onrender.com/generate_pdf',{
      method:'POST',
      headers:{'Content-Type':'application/json',},
      body:JSON.stringify(payload)
    })
    .then(res=>res.json())
    .then(data=>{
      finalLink = data.data;
      document.getElementById('downButton').disabled = false;
    })
    .catch(error=> console.error(error))
    .finally(result=> { 
      myForm.reset();
      return result})
  });

  function downloadFile(){
    const downloadLink = finalLink
    const link = document.createElement("a");
    const name = `${fileName}.pdf`;
    link.href = `data:application/pdf;base64,${downloadLink}`;
    link.download = name;
    link.click();
  }