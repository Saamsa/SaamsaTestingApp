document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#createData').addEventListener('click', () => {
    fetch('http://localhost:3000/createData');
  });
  document.querySelector('#addConsumer').addEventListener('click', () => {
    fetch('http://localhost:3000/addConsumer');
  });
});
