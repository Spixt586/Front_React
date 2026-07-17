import { execSync } from 'child_process'
import { cpSync, mkdirSync, rmSync, existsSync } from 'fs'

const proyectos = [
  'empleados',
  'Taller_Practico_React_Fundamentos_Taller1',
  'tareas',
  'tienda-videojuegos',
]

if (existsSync('public')) rmSync('public', { recursive: true })
mkdirSync('public')

// Copia el menú principal
cpSync('index.html', 'public/index.html')

for (const proyecto of proyectos) {
  console.log(`Compilando ${proyecto}...`)
  execSync('npm install && npm run build', { cwd: proyecto, stdio: 'inherit' })
  cpSync(`${proyecto}/dist`, `public/${proyecto}`, { recursive: true })
}

console.log('Listo. Todo está en /public')