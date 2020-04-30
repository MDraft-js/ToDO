const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function(arrOfTasks) {
  const ObjOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastSelectedTheme = localStorage.getItem('ToDO_theme') || 'default';
  
  const listcontainer = document.querySelector(".tasks-list-section ", ".list-group");
  //renderalltasks(ObjOfTasks);
  
  const form = document.forms['addTask'];
  const inputtitle = form.elements['title'];
  const inputbody = form.elements['body'];
  const themeselect = document.getElementById('themeSelect'); 

  themeset(lastSelectedTheme);
  form.addEventListener('submit', btnsubmit);
  listcontainer.addEventListener('click', btndelete);
  themeselect.addEventListener('change', themeselectcheck)

  function renderalltasks(taskslist) {
  if (!taskslist) {
    alert("Передайте список задач!");
    return;
  }
    
  const fragment = document.createDocumentFragment();
  Object.values(taskslist).forEach(task => {
    const li = listitemtemplate(task);
    fragment.appendChild(li);
  })
    listcontainer.appendChild(fragment);
}
  
  function listitemtemplate({ _id, title, body } = {}) {
  //console.log(_id, title);
    const li = document.createElement("li")
    li.classList.add("list-group-item", "d-flex", "align-items-center", "flex-wrap", "mt-2");
    li.setAttribute('data-task-id', _id);
    //console.log(li);
    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deletebtn = document.createElement("button");
    deletebtn.textContent = "Delete Task";
    deletebtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");
    li.appendChild(span);
    li.appendChild(deletebtn)
    li.appendChild(article);
    //console.log(li);
    return li;
}

function btnsubmit(e) {
  e.preventDefault();
  const titlevalue = inputtitle.value;
  const bodyvalue = inputbody.value;
  //console.log(titlevalue, bodyvalue);

  if (!titlevalue || !bodyvalue){
  alert('Пожалуйста, заполните все поля.')
  return;
  }  

    const task = CreateNewTask(titlevalue, bodyvalue)
    const listitem = listitemtemplate(task);
    console.log(listitem);
    console.log(listcontainer);
    listcontainer.insertAdjacentElement('afterbegin', listitem);
    form.reset();
}
  
  function CreateNewTask(title, body) {
    const NewTask = {
      title,
      body,
      completed: false,
      _id: `task_${Math.random()}`,
    }
    console.log(NewTask);

    ObjOfTasks[NewTask._id] = NewTask;

    return { ...NewTask };
  }

  function deletefn(id) {
    const { title } = ObjOfTasks[id];
    const isConfirm = confirm(`Вы точно хотите удалить задачу: ${title}?`)
    if (!isConfirm) return;
    delete ObjOfTasks[id];
    return isConfirm;
  }

  function deletefnconfirm(confirmed, el) {
    if (!confirmed) return;
    el.remove();    
  } 

  function btndelete({target}) {
    //console.log(e);
    if (target.classList.contains('delete-btn')) {
      // console.log('delete');
      const parent = target.closest('[data-task-id]');
      //console.log(parent);
      const id = parent.dataset.taskId;
      // console.log(parent.dataset);
      // console.log(id);
      const confirmed = deletefn(id);
      deletefnconfirm(confirmed, parent);
    }
  }

  function themeselectcheck(e) {
    const selectedTheme = themeselect.value;
    const isConfirmed = confirm(`Вы действительно хотите изменить тему:${selectedTheme}`)
    if (!isConfirmed) return;
    themeset(selectedTheme);
    localStorage.setItem('ToDO_theme', selectedTheme);
  }

  function themeset(name) {
    const selectedThemeObj = themes[name];
    //console.log(selectedThemeObj);
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

 })(tasks);