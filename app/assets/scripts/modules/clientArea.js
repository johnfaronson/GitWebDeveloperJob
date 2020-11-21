import axios from "axios"

class clientArea
{
    constructor()
    {
        this.injectHTML();
        this.form = document.querySelector(".client-area_form");
        this.field = document.querySelector(".client-area_input");
        this.div = document.querySelector(".client-area_content-area");
        
        this.form.addEventListener("submit", event =>
            {
                event.preventDefault();
                this.sendRequest();                
            });
    }   
    
    injectHTML()
    {
        document.body.insertAdjacentHTML("beforeend", `
<div class="client-area">
  <div class="wrapper wrapper--medium">
    <h2 class="section-title section-title--blue">Secret Client Area</h2>
    <form class="client-area_form" action="">
      <input class="client-area_input" type="text" placeholder="Enter the secret phrase">
      <button class="btn btn--orange">Submit</button>
    </form>
    <div class="client-area_content-area"></div>
  </div>
</div>            
        `)
    }
    
    sendRequest()
    {
        axios.post(".netlify/functions/private-offers", { password: this.field.value }).then(response =>
            {
                this.form.remove();
                this.div.innerHTML = response.data;
            } ).catch(() => 
            {
                this.div.innerHTML = "<p class='client-area_error'>Incorrect Password!</p>";
                this.field.value = "";
                this.field.focus();
            });
    }
}

export default clientArea