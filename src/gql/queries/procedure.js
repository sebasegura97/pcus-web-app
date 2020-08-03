import { gql } from "apollo-boost";

export const GET = gql`
  query GetProcedures($id: ID) {
    procedures(id: $id) {
      ok
      message
      procedures {
        id
        calidadDelProponente
        numeroDeExpediente
        razonSocial
        denominacion
        condicionJuridicaDelInmueble
        nombreProponente
        apellidoProponente
        tipoDeDocumentoProponente
        numeroDeDocumentoProponente
        domicilioRealProponente
        domicilioLegalProponente
        domicilioProyecto
        nombreTRP
        apellidoTRP
        tipoDeDocumentoTRP
        numeroDeDocumentoTRP
        numeroDeCatastro
        planoDeMensura
        superficiePCUS
        constanciaDeMatriculaTRP
        declaracionJuradaAptitudAmbiental
        PCUS
        cartografia
        constanciaDeCUITProponente
        estudioDeImpactoSocioAmbiental
        estado
        user {
          id
          email
        }
        createdAt
        deletedAt
        updatedAt
        reviews {
          id
          requisitosFisicos
          requisitosTecnicos
          requisitosJuridicos
          constanciaDeCuit
          constanciaDeMatricula
          planoDeMensura
          formularioPCUS
          declaracionJuradaAptitudAmbiental
          PCUS
          cartografia
          estudioImpactoAmbiental
          rechazado
          comentarios
          createdAt
          deletedAt
        }
        formPCUS {
          id
          # DATOS DEL APODERADO
          calidadDelApoderado
          CUITApoderado
          domicilioLegalApoderado
          emailApoderado
          # DATOS DEL ARRENDATARIO
          calidadDelArrendatario
          CUITArrendatario
          domicilioLegalArrendatario
          emailArrendatario
          vencimientoContratoArrendatario
          # DATOS DE LA PROPIEDAD
          titularDelDominio
          departamento
          nombreDelInmueble
          matricula
          superficieTotal
          categoriasOTBNFinca
          categoriasOTBNProyecto
          # SUPERFICIE (hectareas)
          total
          cultivada
          desmontada
          aDesmontar
          aprovechada
          aAprovechar
          forestada
          aForestar
          # UBICACION
          localidad
          paraje
          accesoDesde
          pr1Coordenadas
          pr2Coordenadas
          pr3Coordenadas
          pr1DetalleUbicacion
          pr2DetalleUbicacion
          pr3DetalleUbicacion
          # CARACTERISTICAS DEL BOSQUE
          tipoDeBosque
          densidadBosque
          gradoExplotacionBosque
          especiesArboreasConMayorAltura
          especiesArboreasMasAbundantes
          diametrosMaximos
          promedioToconesPorHectarea
          especiesDominanteEnSotoBosque
          # CANTIDAD ESTIMADA DE PRODUCTOS A ELABORAR
          rollos
          postes
          lena
          durmientes
          trabillas
          carbon
          # DETALLE VOLUMEN DE MADERA EN ROLLOS:
          detalleMadera {
            especie
            metrosCubicos
          }
          destinoComercialDeLosProductos
        }
      }
    }
  }
`;

export const GET_STATISTICS = gql`
  query getStatistics($from: String!, $to: String!) {
    getStatistics(from: $from, to: $to) {
      id
      name
      unit
      valueMoreThan300
      valueLessThan300
      description
    }
  }
`;
