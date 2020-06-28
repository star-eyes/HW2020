let tasks=[];//存储输入数据
let im=[];//存储重要程度的数据
let imdone=[];//为了刷新时不把重要程度重置，因此用这个数组来判断是不是第一次创建行程。
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
        if(imdone[i]!=1){//初始化时无数据，因此如果是初始化就给重要程度初始化，否则不对重要程度进行修改
            imdone[i]=1;//1表示这行行程已经初始化
            im[i]=0;//0表示初始的重要程度为1
        };

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
    let impem=["①","②","③","④","⑤"];//重要程度的符号，可增加数量
        impEl.innerText = impem[im[taskIdx]];//根据重要程度显示对应的符号
    impEl.onclick = () =>{     
        if(im[taskIdx]<4){
             im[taskIdx]+=1;
        }else {
            im[taskIdx]=0;
        }   //点击重要程度，小于5的加1，5的话变成1
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
            upem(tasks,taskIdx);
            upem(im,taskIdx);
            upem(imdone,taskIdx);
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
            downem(tasks,taskIdx);
            downem(im,taskIdx);
            downem(imdone,taskIdx);         
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

function upem(arr,i){
    let arrem=arr[i];
    arr.splice(i,1,arr[i-1])
    arr.splice(i-1,1,arrem)  
}
function downem(arr,i){
    let arrem=arr[i];
    arr.splice(i,1,tasks[i+1])
    arr.splice(i+1,1,arrem) 
}
renderEditor();
renderTaskItems();