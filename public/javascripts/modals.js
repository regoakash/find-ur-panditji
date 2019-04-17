//get the modal
var modal = document.getElementById('myModal');

//get the button that opens the modal
var btn = document.getElementById('myBtn');

// get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

//when the user clicks on the button, open the open modal
btn.onclick = () => {
    modal.style.display = 'block';
}

//when the user clicks on <span>(x), close the modal
span.onclick = () => {
    modal.style.display = 'none';
}

//when the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if(event.target == modal) {
        modal.style.display = 'none';
    }
}