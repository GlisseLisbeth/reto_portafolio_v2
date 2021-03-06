window.addEventListener('load',function(){
  var validAgents=getItemFromStorage("agents");
  var agentModule= new AgentModule();
  if (validAgents != null) {
    validAgents.forEach(function(agent) {
      var agent = new Agent(agent.url, agent.state,agent.ipaddress, agent.path);
      agentModule.addAgents(agent);
    });
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
      toolTip.removeChild(toolTipInfo);
    });

    closeToolTip.addEventListener('click',function(e){
      e.preventDefault();
      toolTip.removeChild(toolTipInfo);
    });

    toolTip.appendChild(toolTipInfo);
  }

  function addArticle(index,color){
    var fragment = document.createDocumentFragment();
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
    var deny = document.createElement("span");

    if(color=="green"){
      var deny = document.createElement("span");
      deny.innerHTML="Deny";
      deny.setAttribute("class","deny");
      toolTipResource.appendChild(deny);

      var aDeny = document.createElement("i");
      aDeny.setAttribute("class","material-icons aDeny");
      aDeny.setAttribute("style","font-size:16px");
      aDeny.innerHTML = "block";
      toolTipResource.appendChild(aDeny);
    }

    aSpecify.addEventListener("click", function(e){
      e.preventDefault();

      var cont = document.getElementsByClassName("tool-tip_info");
      addPopup(toolTip,toolTipResource);

      if(cont.length > 1){
        var tooltipinfo = toolTipResource.nextSibling;
        toolTip.removeChild(tooltipinfo);
        alert("Close Popup");
      }

      var iToolTipText = document.getElementById("toolTipText");
      iToolTipText.focus();
    });

    article.appendChild(headerArticle);
    article.appendChild(toolTip);
    sectionContent.appendChild(circle);
    sectionContent.appendChild(article);
    sectionLeft.appendChild(sectionContent);
    fragment.appendChild(sectionLeft);
    document.getElementById('content-agents').appendChild(fragment);
  }

  function addResource(toolTipResource,texto){
    var arrayTexto = texto.split(",");

    var element = toolTipResource.parentNode.parentNode.firstChild.innerHTML;
    var position = getPosition(arrHeaders,element);

    var pos = 0;
    agentModule.agents[position].resources.forEach( function( element ) {
        while( ( pos = arrayTexto.indexOf( element ) ) >= 0 ) {
            arrayTexto.splice( pos, 1 );
            alert("Don't enter duplicate resources")
        }
    } );

    arrayTexto.unique().forEach(function(e,i){
      if (!/^\s+$/.test(e) && e !="" ){
        agentModule.agents[position].addElement(e);
      }
    });
    agentModule.agents[position].resources.forEach(function(resource,i){
        if(!document.getElementById("resource-"+position+i))
        {
          var contentResource = document.createElement("span");
          contentResource.setAttribute("id","resource-"+position+i)
          var aRemove = document.createElement("a");
          aRemove.setAttribute("class","remove");
          aRemove.innerHTML = "x";
          aRemove.addEventListener('click',function(e) {
            e.preventDefault();
            var textSearch = e.target.parentNode.textContent;
            var elementRemove = e.target.parentNode.parentNode.parentNode.parentNode.firstChild.innerHTML;
            var positionRemove = getPosition(arrHeaders,elementRemove);
            if(agentModule.agents[positionRemove].deleteElement(textSearch)){
              deleteResource(toolTipResource,contentResource);
            }
              console.log(agentModule.agents[position]);
            });
          contentResource.innerHTML = resource;
          contentResource.appendChild(aRemove);
          toolTipResource.appendChild(contentResource);
        }
    });
  }

  function deleteResource(toolTipResource,contentResource){
    toolTipResource.removeChild(contentResource);
  }

});
