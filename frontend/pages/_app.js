import "../styles/globals.css"
import Head from "next/head";
//Solo importamos los iconos de Bootstrap en Head
function Global({Component, PageProps}) {
    return (
        <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"></link>
          </Head>
          <Component {...PageProps} />
        </>
      );
    }
export default Global;

//Usar esto para importar Bootstrap

// import "../styles/globals.css"
// import Head from "next/head";
// import Script from "next/script";

// function Global({Component, PageProps}) {
//     return (
//         <>
//           <Head>
//             <meta name="viewport" content="width=device-width, initial-scale=1" />
//             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/>
//           </Head>
//           <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"/>
//           <Component {...PageProps} />
//         </>
//       );
//     }
// export default Global;


//Usar esto para Font Awesome:
//<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>