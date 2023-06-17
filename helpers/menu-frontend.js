const getMenuFrontEnd = (role = 'USER_ROLE')=>{
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu:[
            {titulo: 'Main', url:'/'},
            {titulo: 'ProgressBar', url:'progress'},
            {titulo: 'Graficas', url:'grafica1'},
            {titulo: 'Promesas', url:'promesas'},
            {titulo: 'Rxjs', url:'rxjs'},
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu:[
            // {titulo: 'Usuarios', url:'usuarios'},
            {titulo: 'Hospitales', url:'hospitales'},
            {titulo: 'Medicos', url:'medicos'},
    
          ]
        }
      ]
   
    if(role === 'ADMIN_ROLE'){
        //unshift es para añadir la ruta en la primera posicion del arreglo
        menu[1].submenu.unshift({titulo: 'Usuarios', url:'usuarios'})
    }

    //voy a llamar al menu en todos los lugares donde me devuelva el token, es decir en el controller auth.js
    return menu;
}

module.exports={
    getMenuFrontEnd
}