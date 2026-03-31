const toggleButton = document.getElementById('mudarTema');

if (localStorage.getItem('temaClaro') === 'true') {
  document.body.classList.add('temaClaro');
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('temaClaro');
  localStorage.setItem('temaClaro', document.body.classList.contains('temaClaro'));
});