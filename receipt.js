//import 'bootstrap';
let items;
const savedItems = JSON.parse(localStorage.getItem('items'));

if(Array.isArray(items)){
    items = savedItems;
}else {
    items = [{
        title :'Tomato',
        price : 5000,
        quantity : 0,
        id : 'id1'
    },{
        title :'chile',
        price : 3000,
        quantity : 0,
        id : 'id2'
    },{
        title :'egg',
        price : 7000,
        quantity : 0,
        id : 'id3'
    } ];
}


function createItem(newItem,newPrice,newId){
    items.push({
        title : newItem,
        price : Number(newPrice),
        quantity : 0,
        id : newId
    });
    console.log('Item created');
    saveItems();

}
//save data
function saveItems(){
    localStorage.setItem('items', JSON.stringify(items));
    console.log('Items saved');
}

function removeTodo(idToMinus){
    for(let i=0;i<items.length;i++){
            if(items[i].id+'-' === idToMinus){
                if (items[i].quantity === 0){
                    break;
                }else{
                    items[i].quantity -= 1;
                }
                
                console.log('Item minus');
                break;
            }
        }
    saveItems();
}

function tambahTodo(idToTambah){
    for(let i=0;i<items.length;i++){
            if(items[i].id+'+' === idToTambah){
                items[i].quantity += 1;
                console.log('Item tambah');
                break;
            }
        }
    saveItems();
}

//Controller
function addItem() {
    let idUnique = true;
    let getData = document.getElementById('newItem');
    const newItem = getData.value;
    console.log(newItem);

    getData = document.getElementById('newId');
    const newId = getData.value;
    console.log(newId);

    getData = document.getElementById('newPrice');
    const newPrice = getData.value;
    console.log(newPrice);

    for(let i=0;i<items.length;i++){
        if(items[i].id=== newId){
            const submit = document.getElementById('sumbit');
            submit.innerHTML =' ';
            submit.innerHTML ='Id has been used';
            idUnique = false;
            break;
        }
    }

    if(idUnique){
            createItem(newItem,newPrice,newId);
            renderSumbit();
    }
}

function kurangButton(event){
    console.log('kurang tambah');
    const deleteButton = event.target;
    const idToMinus = deleteButton.id;

    removeTodo(idToMinus);
    render();
}

function tambahButton(event){
    console.log('masuk tambah');
    const deleteButton = event.target;
    const idToTambah = deleteButton.id;

    tambahTodo(idToTambah);
    render();
}
render();



//view
function render(){
    const product = document.getElementById('product-name');
    product.innerHTML="";
    items.forEach(function (item){
        let element = document.createElement('div');
        element.style=`margin-bottom:4px;`;
        element.innerText = item.title;

        product.appendChild(element);
    });


    const price = document.getElementById('product-price');
    price.innerHTML="";
    items.forEach(function (item){
        let element = document.createElement('div');
        element.style=`margin-bottom:4px;`;
        element.innerText = item.price;

        price.appendChild(element);
    });

    const quantity = document.getElementById('product-quantity');
    quantity.innerHTML="";
    items.forEach(function (item){
        let element = document.createElement('div');
        let id;
        
        let minusButton = document.createElement('button');
        minusButton.innerText = '-';
        minusButton.className = 'btn btn-outline-secondary m-auto px-2 py-0 mx-1';
        minusButton.onclick = kurangButton;
        id=item.id+'-';
        minusButton.id = id;
        element.appendChild(minusButton);

        let paragraph = document.createElement('p');
        paragraph.innerText = item.quantity;
        paragraph.style = 'display:inline;';
        element.appendChild(paragraph);
        
        let plusButton = document.createElement('button');
        plusButton.innerText = '+';
        plusButton.className = 'btn btn-outline-secondary m-auto px-2 py-0 mx-1';
        //deleteButton.onclick = deleteTodo;
        plusButton.onclick = tambahButton;
        id=item.id+'+';
        plusButton.id = id;
        element.appendChild(plusButton);

        quantity.appendChild(element);
    });

}

function renderSumbit(){
    const submit = document.getElementById('sumbit');
    submit.innerHTML =' ';
    submit.innerHTML ='New item add successfully';
    render();
}

function renderResult(){
    const result1 = document.getElementById('resultProduct');
    result1.innerHTML='';
    let totalPrice=0;

    const result2 = document.getElementById('resultPrice');
    result2.innerHTML='';
    items.forEach(function (item){
        let element = document.createElement('div');
        element.innerHTML = item.title;
        result1.appendChild(element);    
        
        let element2 = document.createElement('div');
        element2.innerHTML = `${item.price}*${item.quantity}`;
        totalPrice += item.price*item.quantity;
        result2.appendChild(element2);
    });
    let element = document.createElement('div');
    element.innerHTML = "Total";
    element.className = "fw-bold mt-1"
    result1.appendChild(element);

    let element2 = document.createElement('div');
    element2.innerHTML = totalPrice;
    element2.className = "fw-bold mt-1"
    result2.appendChild(element2);    
}

