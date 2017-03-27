window.addEventListener('load',function(){
  var validAgents = getItemFromStorage('agents');
  if(validAgents == null){
    validAgents = [];
    validAgents.push({ url: "bjstdmngbgr02.thoughtworks.com", state: "idle", ipaddress: "192.168.1.2", path: "/var/lib/cruise-agent"});
    validAgents.push({ url: "bjstdmngbgr03.thoughtworks.com", state: "building", ipaddress: "192.168.1.3", path: "/var/lib/cruise-agent"});
    validAgents.push({ url: "bjstdmngbgr04.thoughtworks.com", state: "building", ipaddress: "192.168.1.4", path: "/var/lib/cruise-agent"});
    validAgents.push({ url: "bjstdmngbgr05.thoughtworks.com", state: "idle", ipaddress: "192.168.1.5", path: "/var/lib/cruise-agent"});
    addItemToStorage('agents',validAgents);
}
});
