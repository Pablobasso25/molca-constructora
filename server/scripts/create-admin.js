// Crea un administrador o cambia su clave: npm run create-admin -- <usuario>
const readline = require('readline')
const bcrypt = require('bcryptjs')
const pool = require('../src/config/db')

const ask = (question) =>
  new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })

const main = async () => {
  const usuario = process.argv[2]
  if (!usuario) throw new Error('Uso: npm run create-admin -- <usuario>')

  const clave = await ask('Clave (mínimo 10 caracteres, se ve al escribir): ')
  if (clave.length < 10) throw new Error('La clave es demasiado corta')

  const hash = await bcrypt.hash(clave, 12)
  await pool.execute(
    `INSERT INTO users (usuario, clave, rol) VALUES (?, ?, 'admin') AS nuevo
     ON DUPLICATE KEY UPDATE clave = nuevo.clave, activo = 1`,
    [usuario, hash]
  )
  console.log(`Usuario "${usuario}" guardado`)
}

main()
  .catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())
