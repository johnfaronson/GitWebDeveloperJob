import "../styles/styles.css"
import "lazysizes"
import menuClass from "./modules/menu"
import scrollRevealClass from "./modules/scrollReveal"
import stickyHeaderClass from "./modules/stickyHeader"
import sectionHighlighterClass from "./modules/sectionHighlighter"
import clientArea from "./modules/clientArea"
import React from "react"
import reactDom from "react-dom"
import ReactComponent from "./modules/reactComponent"

//original pre-load modal Js
//import modal from "./modules/modal";
//new modal();
reactDom.render(<ReactComponent />, document.querySelector("#react-example"));

new clientArea();
new menuClass();
new stickyHeaderClass(".large-hero");
new scrollRevealClass(".feature-item");
new scrollRevealClass(".testimonial");
new sectionHighlighterClass("our-beginning-link", "our-beginning");
//new sectionHighlighterClass("our-beginning-link", "our-beginning2");
new sectionHighlighterClass("features-link", "features");
new sectionHighlighterClass("testimonals-link", "testimonials");
let modal;


document.querySelectorAll(".open-modal").forEach(elem => 
    {
        elem.addEventListener("click", event =>
            {
                event.preventDefault();
                if(typeof modal == "undefined")
                {                   
                    import(/* webpackChunkName: "modal" */ "./modules/modal").then(x =>
                        {
                           modal = new x.default();
                           console.log("new modal: " +modal);
                           setTimeout(() => modal.openModal(), 20);
                        }).catch(() => console.log("Error while loading modal Js!"));
                }else
                {
                    console.log("existing modal: " +modal);
                    modal.openModal();
                }
            });
    });

if(module.hot)
{
	module.hot.accept();
}

//console.log("test message");


//alert("Hello JS World!!")
