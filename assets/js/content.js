window.addEventListener('load',function(){
  var validAgents=getItemFromStorage("agents");
  var agentModule= new AgentModule();
  if (validAgents != null) {
    validAgents.forEach(function(agent) {
      agentModule.addAgents(agent.url, agent.state,agent.ipaddress, agent.path);
    },this);
  }

  var arrHeaders =agentModule.getArray();
  agentModule.agents.forEach(function(e,i) {
    var color;
    if(e.state =="idle"){
      color = "green";
    }
    else if(e.state =="building"){
      color = "yellow";
    }
    addArticle(i,color);
  });

  function addPopup(toolTip,toolTipResource){
    var texto="";
    var toolTipInfo = document.createElement("div");
    toolTipInfo.setAttribute("class","tool-tip_info");

    var sToolTip = document.createElement("span");
    sToolTip.setAttribute("class","info_title");
    sToolTip.innerHTML = "(Separate multiple resources name with commas) </br>";
    toolTipInfo.appendChild(sToolTip);

    var iToolTip = document.createElement("input");
    iToolTip.setAttribute("id","toolTipText");
    iToolTip.setAttribute("type","text");
    iToolTip.style.width = "470px";
    iToolTip.innerHTML = "</br>";

    toolTipInfo.style.display = "block";

    sToolTip.appendChild(iToolTip);

    var addButtonResource = document.createElement("button");
    addButtonResource.setAttribute("id","add");
    addButtonResource.setAttribute("type","button");
    addButtonResource.setAttribute("class","button-resource");
    // addButtonResource.innerHTML= "Add resources";
    addButtonResource.appendChild(document.createTextNode("Add resources"));

    toolTipInfo.appendChild(addButtonResource);

    var closeToolTip = document.createElement("button");
    closeToolTip.setAttribute("id","close");
    closeToolTip.setAttribute("type","button");
    closeToolTip.setAttribute("class","button-resource");
    closeToolTip.innerHTML= "Close";
    toolTipInfo.appendChild(closeToolTip);

    addButtonResource.addEventListener('click',function(e){
      e.preventDefault();
      addResource(toolTipResource,iToolTip.value);
      toolTipInfo.style.display = "none";
    });

    closeToolTip.addEventListener('click',function(e){
      e.preventDefault();
      toolTipInfo.style.display = "none";
    });

    toolTip.appendChild(toolTipInfo);
    return texto;
  }

  function addArticle(index,color){
    var sectionLeft = document.getElementById("left");
    sectionLeft.setAttribute("class","left");

    var sectionContent = document.createElement("section");
    sectionContent.setAttribute("class", 'content-left '+color);
    var article = document.createElement("article");
    var circle = document.createElement("aside");
    circle.setAttribute("class","circle");
    var headerArticle = document.createElement("h4");
    headerArticle.innerHTML = arrHeaders[index];

    var toolTip = document.createElement("div");
    toolTip.setAttribute("class","tool-tip");

    var toolTipResource = document.createElement("div");
    toolTipResource.setAttribute("class","tool-tip_resource")
    toolTip.appendChild(toolTipResource);

    var sToolTipResource = document.createElement("span");
    sToolTipResource.setAttribute("class","tool-tip-span");
    sToolTipResource.innerHTML="+";
    toolTipResource.appendChild(sToolTipResource);

    var aSpecify = document.createElement("a");
    aSpecify.href="#";
    aSpecify.innerHTML="Specify Resources";
    sToolTipResource.appendChild(aSpecify);

    var tXtResource = document.createElement("span");
    tXtResource.innerHTML = "| Resources";
    toolTipResource.appendChild(tXtResource);
    aSpecify.addEventListener("click", function(e){
      e.preventDefault();
      addPopup(toolTip,toolTipResource);
    });

    article.appendChild(headerArticle);
    article.appendChild(toolTip);
    sectionContent.appendChild(circle);
    sectionContent.appendChild(article);
    sectionLeft.appendChild(sectionContent);


  }

  function addResource(toolTipResource,texto){
    var arrayTexto = texto.split(",");
    arrayTexto.forEach(function(e,i){
      if(e != ""){
        var span = document.createElement("span");
        var aRemove = document.createElement("a");
        aRemove.setAttribute("class","remove");
        aRemove.innerHTML = "x";

        aRemove.addEventListener('click',function(e) {
          e.preventDefault();
          deleteResource(toolTipResource,span);
        });

        span.innerHTML = e;
        toolTipResource.appendChild(span);
        span.appendChild(aRemove);
      }
    });
  }

  function deleteResource(toolTipResource,span){
    toolTipResource.removeChild(span);
  }
});
