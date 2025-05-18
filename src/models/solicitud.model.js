
import { pool } from "../db.js"

const solicitudesPendientes = async (estado) => {
  const query = {
    text: `
      SELECT 
          cp.id_formulario, 
          pe.ci, 
          pe.nombres, 
          pe.apellido_paterno, 
          pe.apellido_materno, 
          cp.nombre_propuesta, 
          cp.fecha 
      FROM carta_propuesta cp
      JOIN cuentas cu ON cp.id_cuenta = cu.id_cuenta
      JOIN persona pe ON cu.id_persona = pe.id_persona
      WHERE cp.estado = $1
      GROUP BY 
          cp.id_formulario, 
          pe.ci, 
          pe.nombres, 
          pe.apellido_paterno, 
          pe.apellido_materno, 
          cp.nombre_propuesta, 
          cp.fecha
      `,
    values: [estado],
  };
  const { rows } = await pool.query(query);
  return rows;
};

const solicitudPendId = async (id_formulario) => {
  const query = {
    text: `
      SELECT 
        p.ci,
        p.nombres,
        p.apellido_paterno,
        p.apellido_materno,
        cp.carta,
        cp.detalle_propuesta,
        cp.nombre_propuesta
      FROM carta_propuesta cp
      JOIN cuentas c ON cp.id_cuenta = c.id_cuenta
      JOIN persona p ON c.id_persona = p.id_persona
      WHERE cp.id_formulario = $1
    `,
    values: [id_formulario],
  };
  const { rows } = await pool.query(query);
  return rows;
};


const solicitudesPorEstado = async () => {
  const query = {
    text: `
      SELECT 
        p.ci,
        p.nombres,
        p.apellido_paterno,
        p.apellido_materno,
        cp.nombre_propuesta AS titulo,
        cp.fecha,
        cp.estado,
        ce.comentario
      FROM carta_propuesta cp
      LEFT JOIN formulario_estado ce 
        ON cp.id_formulario = ce.id_formulario
      JOIN cuentas c 
        ON cp.id_cuenta = c.id_cuenta
      JOIN persona p 
        ON c.id_persona = p.id_persona
      WHERE cp.estado IN (4, 5, 6)
        AND ce.comentario <> '0'
      GROUP BY 
        p.ci, 
        p.nombres, 
        p.apellido_paterno, 
        p.apellido_materno, 
        cp.nombre_propuesta, 
        cp.fecha, 
        cp.estado, 
        ce.comentario
    `,
  };

  const { rows } = await pool.query(query);
  return rows;
};


const revisionId = async (id_cuenta) => {
  const query = `
      SELECT 
        f.id_formulario, 
        f.nombre_propuesta, 
        c.id_categoria,  -- trae el nombre de la categoría
        f.estado, 
        f.fecha
      FROM carta_propuesta f
      JOIN categoria c ON f.id_categoria = c.id_categoria
      WHERE f.estado > 0
        AND f.id_cuenta = $1
    `;

  const { rows } = await pool.query(query, [id_cuenta]);
  console.log(rows)
  return rows;
};


const comentariosFormularios = async (id_formulario) => {
  const query = `
      SELECT fe.id_formulario, fe.id_cuenta, fe.comentario, pe.nombres, pe.apellido_paterno, pe.apellido_materno, pe.correo, cu.id_cuenta
      FROM formulario_estado fe, cuentas cu, persona pe
      WHERE fe.id_formulario = $1
      and fe.id_cuenta = cu.id_cuenta
      and pe.id_persona = cu.id_persona
  `;
  const { rows } = await pool.query(query, [id_formulario]);
  return rows;
};




export const solicitudModel = {
  solicitudesPendientes,
  solicitudPendId,
  solicitudesPorEstado, // Nueva función añadida
  revisionId,
  comentariosFormularios,
};