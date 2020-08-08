const postlist=document.querySelector('.post-list')
const addPostForm=document.querySelector('.add-post-form')
const titleValue=document.getElementById('title-value')
const bodyValue=document.getElementById('body-value')
const btnSubmit=document.querySelector('.submit_btn')
let output='';

const renderPosts=(posts)=>{
    posts.forEach(post=>{   
        output +=`
            <div class="card col-md-6 bg-light mt-4" >
                <div class="card-body" data-id=${post.id}>
                  <h5 class="card-title">${post.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">ID : ${post.id}</h6>
                  <p class="card-text">${post.body}</p>
                  <a href="#" class="card-link" id="edit-post">Edit</a>
                  <a href="#" class="card-link" id="delete-post">Delete</a>
                </div>
            </div>
        `;                               
    });
    postlist.innerHTML=output
}

const url='https://jsonplaceholder.typicode.com/posts';
// Get read the post
// Method:GET
fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))

postlist.addEventListener('click',(e)=>{
    e.preventDefault();
    let delButtonIsPressed= e.target.id == 'delete-post'
    let editButtonIsPressed= e.target.id == 'edit-post'
    let id=e.target.parentElement.dataset.id;
    // console.log(e.target.parentElement.dataset.id);
    // delete post
    if(delButtonIsPressed){
        fetch(`${url}/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(()=>location.reload())

    }

    if(editButtonIsPressed){
        const parent=e.target.parentElement;
        let titleContent=parent.querySelector('.card-title').textContent;
        let bodyContent=parent.querySelector('.card-text').textContent;
        // console.log(titleContent,bodyContent);
        titleValue.value=titleContent
        bodyValue.value=bodyContent
    }

    // update
    btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault()
        fetch(`${url}/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                title:titleValue.value,
                body:bodyValue.value
            })
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    })
})
// create insert new post
addPostForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    fetch(url,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            title:titleValue.value,
            body:bodyValue.value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        const dataArr=[]
        dataArr.push(data)
        renderPosts(dataArr)
    })
    // reset input 
    titleValue.value=''
    bodyValue.value=''

})