let tasks=[];
let im=[];
let imdone=[];
function renderEditor(){
    let inputEL = document.querySelector("#default-todo-panel .todo-editor > input");
   
    let addtask = () =>{
        if (inputEL.value.length===0){
            return;
        }
        let newtask={
            title: inputEL.value,
            done: false,
        };

        inputEL.value=" ";
    
        tasks.push(newtask);

        console.log("tasks=",tasks);
      
        renderTaskItems();
    }
    inputEL.onkeypress = (e) =>{
        if (e.key === "Enter"){
            addtask();
        }
    }

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) =>{
        addtask();
      
    };
  
    
}

function renderTaskItems(){
    console.log("render items")
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");
    
    itemsEl.querySelectorAll("div").forEach((node)=>node.remove());

    for(let i=0; i < tasks.length; i++ ) {
        let task = tasks[i];
        if(imdone[i]!=1){
            imdone[i]=1;
            im[i]=0;
        };//表示已注册过IM

        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        }else {
            itemEl.classList.remove("done");
        }
        doneEl.onchange = (e) =>{
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            }else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);
    
       let ctrlbarEl=renderTaskCtrlBar(tasks,i);

        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }
}

function renderTaskCtrlBar(tasks,taskIdx){
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let impEl = document.createElement("button");
    let impem=["①","②","③","④","⑤"];
        impEl.innerText = impem[im[taskIdx]];
    impEl.onclick = () =>{     
        if(im[taskIdx]<4){
             im[taskIdx]+=1;
        }else {
            im[taskIdx]=0;
        }   
        renderTaskItems();
    }
    ctrlbarEl.append(impEl);

    let upEl = document.createElement("button");
    if (taskIdx === 0){
        upEl.disabled = true;
    }
    upEl.innerText = "↑";
    upEl.onclick = () =>{
        if (taskIdx>0){
        let taskem=tasks[taskIdx];
        tasks.splice(taskIdx,1,tasks[taskIdx-1])
        tasks.splice(taskIdx-1,1,taskem) 
        let imem=im[taskIdx];
        im.splice(taskIdx,1,im[taskIdx-1])
        im.splice(taskIdx-1,1,imem) 
        let zh=imdone[taskIdx];
        imdone[taskIdx]=imdone[taskIdx-1];
        imdone[taskIdx-1]=zh;
        renderTaskItems(); 
        }
    }
    ctrlbarEl.append(upEl);

    let downEl = document.createElement("button");
    if (taskIdx === tasks.length-1){
        downEl.disabled = true;
    }
    downEl.innerText = "↓";
    downEl.onclick = () =>{
        if (taskIdx < (tasks.length-1)){
            let taskem=tasks[taskIdx];
            tasks.splice(taskIdx,1,tasks[taskIdx+1])
            tasks.splice(taskIdx+1,1,taskem) 
            let imem=im[taskIdx];
            im.splice(taskIdx,1,im[taskIdx+1])
            im.splice(taskIdx+1,1,imem) 
            let zh=imdone[taskIdx];
            imdone[taskIdx]=imdone[taskIdx+1];
            imdone[taskIdx+1]=zh;
            renderTaskItems(); 
            }
    }
    ctrlbarEl.append(downEl);

    let cancelEl = document.createElement("button");
    cancelEl.innerText = "X";
    cancelEl.onclick = () =>{
        im.splice(taskIdx, 1); 
        imdone.splice(taskIdx, 1); 
        tasks.splice(taskIdx, 1);     
        renderTaskItems();
    }

    ctrlbarEl.append(cancelEl);
    return ctrlbarEl;
}

renderEditor();
renderTaskItems();