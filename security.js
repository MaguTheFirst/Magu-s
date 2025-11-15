(() => {
  const blockedCombos = [
    {ctrlKey:true,key:'u',label:'View Source'},
    {ctrlKey:true,shiftKey:true,key:'i',label:'DevTools'},
    {ctrlKey:true,shiftKey:true,key:'c',label:'DevTools'},
    {ctrlKey:true,shiftKey:true,key:'j',label:'DevTools'},
    {ctrlKey:true,key:'s',label:'Save Page'},
    {ctrlKey:true,key:'p',label:'Print'},
    {key:'F12',label:'DevTools'}
  ];

  document.addEventListener('keydown', event => {
    const normalizedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if(blockedCombos.some(combo =>
      (!!combo.ctrlKey === event.ctrlKey) &&
      (!!combo.shiftKey === event.shiftKey || combo.shiftKey === undefined) &&
      (!!combo.altKey === event.altKey || combo.altKey === undefined) &&
      normalizedKey === combo.key.toLowerCase()
    )){
      event.preventDefault();
      alert('Developer shortcuts are disabled on this site.');
    }
  }, true);

  document.addEventListener('contextmenu', e => e.preventDefault());

  const watchdog = () => {
    if(window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200){
      document.body.innerHTML = '<h1 style="color:#fff;text-align:center;margin-top:20%">Security mode activated. Refresh to continue.</h1>';
    }
  };
  setInterval(watchdog, 1000);
})();

