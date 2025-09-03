
async function loadItems(){
  try{
    const res = await fetch('data/items.json', {cache: "no-store"});
    const items = await res.json(); // items 应为数组：[{ "img":"assets/1.jpg", "text":"xxx" }, ...]
    renderTable(items || []);
  }catch(e){
    console.error("加载 data/items.json 失败：", e);
    renderTable([]);
  }
}

function renderTable(items){
  const rowsEl = document.getElementById('rows');
  rowsEl.innerHTML = '';
  const total = 100;
  for(let i=0;i<total;i++){
    const item = items[i] || null;
    const row = document.createElement('div');
    row.className = 'row' + (i%2? ' alt':'');
    row.setAttribute('role','row');


    const colImg = document.createElement('div');
    colImg.className = 'cell col-img';
    colImg.setAttribute('role','cell');

    const imgWrap = document.createElement('div');
    imgWrap.className = 'img-wrap';

    if(item && item.img){
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.alt || (`row-${i+1}-img`);
      img.loading = 'lazy';
      img.onerror = function(){ this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100"><rect width="100%" height="100%" fill="%23f0f2f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239aa6bf" font-size="14">图片未找到</text></svg>'; };
      imgWrap.appendChild(img);
    }else{
      imgWrap.innerHTML = '<div class="empty-note">未提供图片</div>';
    }
    colImg.appendChild(imgWrap);


    const colText = document.createElement('div');
    colText.className = 'cell col-text';
    colText.setAttribute('role','cell');
    if(item && item.text){
      colText.textContent = item.text;
    }else{
      colText.innerHTML = `<span class="empty-note">（第 ${i+1} 行，未填写文字）</span>`;
    }

    row.appendChild(colImg);
    row.appendChild(colText);
    rowsEl.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', loadItems);
async function loadItems(){
  try{
    const res = await fetch('data/items.json', {cache: "no-store"});
    const data = await res.json(); 
    const items = data.images || [];  // 图片数组
    const videos = data.videos || []; // 视频数组
    renderTable(items || []);
    renderVideos(videos || []);
  }catch(e){
    console.error("加载 data/items.json 失败：", e);
    renderTable([]);
    renderVideos([]);
  }
}
function renderVideos(videos){
  const rowsEl = document.getElementById('videoRows');
  rowsEl.innerHTML = '';
  const total = 10;
  for(let i=0;i<total;i++){
    const item = videos[i] || null;
    const row = document.createElement('div');
    row.className = 'row' + (i%2? ' alt':'');
    row.setAttribute('role','row');

    const colVideo = document.createElement('div');
    colVideo.className = 'cell col-img';
    colVideo.setAttribute('role','cell');

    if(item && item.video){
      const video = document.createElement('video');
      video.controls = true;
      video.src = item.video;
      video.width = 420;
      colVideo.appendChild(video);
    }else{
      colVideo.innerHTML = '<div class="empty-note">未提供视频</div>';
    }

    const colText = document.createElement('div');
    colText.className = 'cell col-text';
    colText.setAttribute('role','cell');
    if(item && item.text){
      colText.textContent = item.text;
    }else{
      colText.innerHTML = `<span class="empty-note">（第 ${i+1} 行，未填写文字）</span>`;
    }

    row.appendChild(colVideo);
    row.appendChild(colText);
    rowsEl.appendChild(row);
  }
}