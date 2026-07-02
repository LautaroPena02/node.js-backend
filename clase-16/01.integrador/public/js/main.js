const contenedorProductos = document.querySelector('#contenedor-productos');

const peticionBorrado = async (id) => {
  try {
    const urlEliminacion = '/remove/' + id;
    const res = await fetch(urlEliminacion, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(
        `No se pudo borrar el producto con el id especificado: ${id}`
      );
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

contenedorProductos.addEventListener('click', (e) => {
  //console.log(e);
  //console.log(e.target.classList.contains('eliminar-producto'));
  if (e.target.classList.contains('eliminar-producto')) {
    //console.log('Hicieron click sobre el bóton');
    //console.log(e.target.dataset.id);
    const id = e.target.dataset.id;

    Swal.fire({
      title: '¿Estás seguro que querés eliminar el producto?',
      text: 'No se va a poder volver atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡borralo!',
      cancelButtonText: 'Nooooo',
    }).then(async (result) => {
      if (result.isConfirmed) {
        //console.log('Logica de borrado...', e.target.dataset.id);
        const resultado = await peticionBorrado(id);
        console.log(resultado);
        Swal.fire({
          title: 'Borrado...',
          text: 'El producto fue borrado',
          icon: 'success',
        });
        setInterval(() => {
          window.location.reload();
        }, 2000);
      }
    });
  } /*  else {
    console.log('Fuera del botón');
  } */
});
