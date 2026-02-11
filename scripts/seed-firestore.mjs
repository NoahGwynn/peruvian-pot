import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBts-G7h8sGqt8GL_feVue0U45j1-cqal8',
  authDomain: 'peruvian-pot.firebaseapp.com',
  projectId: 'peruvian-pot',
  storageBucket: 'peruvian-pot.appspot.com',
  messagingSenderId: '650626539266',
  appId: '1:650626539266:web:1614b68b1de7eb2c67ec1b',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// --- DELETE ALL COMMENTS ---
async function deleteAllComments() {
  console.log('Deleting existing comments...')
  const snapshot = await getDocs(collection(db, 'comments'))
  let count = 0
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, 'comments', d.id))
    count++
    process.stdout.write(`\rDeleted: ${count}`)
  }
  console.log(`\n✓ Deleted ${count} comments`)
}

// --- SEED NEW COMMENTS ---
const commentData = {
  'recipe-001': [ // Ceviche Clásico
    { name: 'Gloria', text: 'Asi lo hacía mi mamá en el Callao!! el secreto es el limón bien ácido y pescado del día' },
    { name: 'Mike', text: 'Made this last weekend for a bbq. Everyone went crazy for it. Didnt have aji limo so used serrano peppers and it was still great' },
    { name: 'Claudia Ríos', text: 'La leche de tigre quedó espectacular. I served it in shot glasses as a starter and my guests loved it.' },
    { name: 'Jen', text: 'had this in lima last year and been trying to recreate it ever since. this is the closest recipe ive found, thank u!!' },
  ],
  'recipe-002': [ // Lomo Saltado
    { name: 'Jorge', text: 'El truco es que el wok esté bien caliente antes de poner la carne. Yo lo hago en tandas pequeñas para que se selle bien. Queda igualito al de los chifas de Lima.' },
    { name: 'Sarah K', text: 'This is SO good. The soy sauce + aji amarillo combo is unlike anything else. My new weeknight go-to.' },
    { name: 'Raúl', text: 'Buen lomo! yo le pongo un poquito de vinagre al final para darle ese toque acido q tienen los buenos chifas' },
    { name: 'Dan', text: 'pro tip: keep the fries on the side so they dont get soggy. game changer' },
    { name: 'Lucía Fernández', text: 'Mi esposo es peruano y dice que este es el mejor lomo saltado que ha probado fuera de Peru. That is HIGH praise lol' },
  ],
  'recipe-003': [ // Suspiro Limeño
    { name: 'Milagros', text: 'El merengue con oporto le da ese toque especial. Paciencia con el manjar blanco, hay q revolverlo constantemente para que no se pegue!' },
    { name: 'Jessica', text: 'Made this for valentines day and it was a hit. so rich and creamy. the meringue on top is beautiful' },
  ],
  'recipe-004': [ // Pisco Sour
    { name: 'Tomas', text: 'Finally a recipe that gets the ratios right!! Use quebranta pisco, none of that italia stuff for sours. The egg white is non-negotiable.' },
    { name: 'Marisol', text: 'En mi familia lo hacemos con pisco acholado y queda buenísimo. Las gotitas de amargo de angostura son clave para el aroma.' },
    { name: 'Tom Barrett', text: 'Best cocktail ive ever made at home. My wife and i now have "pisco sour fridays"' },
  ],
  'recipe-005': [ // Papa a la Huancaína
    { name: 'María Elena', text: 'Yo uso papa amarilla, le da mejor sabor y textura. Las galletas en la salsa es el secreto que mucha gente no sabe!' },
    { name: 'Becky', text: 'the sauce is ADDICTIVE. i literally put it on everything now - sandwiches, eggs, grilled chicken. peru knows what theyre doing with sauces' },
    { name: 'Renzo', text: 'queda mejor con leche evaporada en vez de leche normal. mas cremosita la salsa' },
  ],
  'recipe-006': [ // Pachamanca
    { name: 'Fernando Huamán', text: 'Hicimos pachamanca para 28 de julio y fue lo mejor de la celebración. El sabor ahumado de la cocción bajo tierra no se compara con nada.' },
    { name: 'Jenny', text: 'We adapted this using a dutch oven since we live in an apartment lol. Turned out amazing honestly. The herbs are everything.' },
  ],
  'recipe-007': [ // Picarones
    { name: 'Rosario', text: 'La miel de chancaca es lo que hace la magia!! Mi abuelita vendia picarones en Barranco. Esta receta me trae muchos recuerdos' },
    { name: 'Alex', text: 'took me like 5 tries to get the ring shape down but once you get it its so satisfying. way better than donuts imo' },
    { name: 'Camila Ochoa', text: 'The sweet potato and squash combination makes these so soft inside. I can never eat just one!' },
  ],
  'recipe-008': [ // Chicha Morada
    { name: 'Doris', text: 'En mi casa siempre hay una jarra en la refri. Le pongo manzanita picada y un chorrito de limón antes de servir. Los niños la aman!!' },
    { name: 'Brian', text: 'ok this is incredible?? purple corn drink sounds weird but its like the best thing ive ever tasted. so refreshing' },
  ],
  'recipe-009': [ // Tacacho con Cecina
    { name: 'Manuel', text: 'Esto me lleva directo a Tarapoto! nada como la comida de la selva. El chicharrón mezclado con el tacacho es clave' },
    { name: 'Chris M', text: 'The smoky cecina with the plantain balls is such a unique combo. Never had anything like it before. Really cool recipe.' },
  ],
  'recipe-010': [ // Juane
    { name: 'Rosa', text: 'No hay fiesta de San Juan sin juanes!! las hojas de bijao le dan un aroma increíble al arroz. Me encanta esta receta!' },
    { name: 'Michelle Torres', text: 'I brought these to a potluck and everyone kept asking me for the recipe. The turmeric rice wrapped in leaves is such a cool presentation.' },
    { name: 'Edwin', text: 'asi se hace!! con bastante aceituna y huevo duro. en iquitos esto es sagrado jaja' },
  ],
  'recipe-011': [ // Aguajina
    { name: 'Pedro', text: 'En la selva le dicen la fruta de la belleza. Cremoso, dulce, y nutritivo. No hay nada igual.' },
    { name: 'Natalie', text: 'such a unique tropical flavor! never tried anything like aguaje before. really refreshing on hot days' },
  ],
  'recipe-012': [ // Inchicapi
    { name: 'Flor', text: 'El maní molido hace que el caldo quede super cremoso y rico. Esto es soul food de la selva peruana' },
    { name: 'Lisa Park', text: 'A peanut and chicken soup sounds unusual but its SO comforting. One of those hidden gems of peruvian food.' },
  ],
  'recipe-013': [ // Aji de Gallina
    { name: 'Consuelo', text: 'Domingos en Lima = ají de gallina de mamá. El pan remojado en la salsa es lo que le da esa textura perfecta. Nadie lo hace como ella pero esta receta se acerca mucho!' },
    { name: 'Rachel', text: 'the creamy yellow pepper sauce is incredible. I added walnuts on top like they do in some lima restaurants. SO GOOD' },
    { name: 'Roberto Castañeda', text: 'El secreto está en tostar la pasta de ají amarillo antes. Eso le saca todo el sabor.' },
  ],
  'recipe-014': [ // Causa Limeña
    { name: 'Isabella', text: 'Such a pretty dish for parties! the layers of potato with avocado look so impressive and its actually not that hard to make' },
    { name: 'Arturo', text: 'La papa amarilla con el limón ya es rica sola. Agrégale la palta y el pollo y tienes un plato de otro nivel. Siempre impresiona.' },
  ],
  'recipe-015': [ // Anticuchos de Corazón
    { name: 'Valentina', text: 'Street food at its absolute finest. La marinada de aji panca transforma el corazón en algo increíblemente tierno.' },
    { name: 'Dave Rodriguez', text: 'i was skeptical about beef heart but this recipe converted me. the marinade is EVERYTHING. now i literally crave these' },
    { name: 'Martín', text: 'no has vivido hasta que comes anticuchos de carretilla a medianoche en lima. esta receta captura esa magia perfectamente' },
  ],
  'recipe-016': [ // Rocoto Relleno
    { name: 'Gonzalo', text: 'Arequipa está orgullosa!! el rocoto relleno con pastel de papa al lado es lo máximo. Remojar los rocotos en agua con azúcar les baja el picante sin quitarles sabor' },
    { name: 'Emma W', text: 'WARNING: these are spicy lol. But so worth it. The melted cheese on top with the meat filling is heavenly.' },
  ],
  'recipe-017': [ // Arroz con Leche
    { name: 'Anita', text: 'La canela y la leche condensada hacen que la versión peruana sea especial. Comfort food que me recuerda a mi infancia en Trujillo' },
    { name: 'Marcus', text: 'Simple but perfect. kids ask for this every single week now. i top it with extra cinnamon and some raisins' },
  ],
  'recipe-018': [ // Mazamorra Morada
    { name: 'Pilar', text: 'Octubre en Lima no es octubre sin mazamorra morada!! esta receta está igualita. El olor a clavo llena toda la casa' },
    { name: 'Priya', text: 'purple corn pudding?? sounds wild but its honestly amazing. i love learning about peruvian food thru this site' },
  ],
  'recipe-019': [ // Tiradito
    { name: 'Diego Sánchez', text: 'La influencia Nikkei hace que este plato sea tan elegante. Cortar el pescado bien finito es clave.' },
    { name: 'Hannah', text: 'Like ceviches more sophisticated cousin. used super fresh tuna and it literally melted in my mouth. restaurant quality at home!' },
  ],
  'recipe-020': [ // Patarashca
    { name: 'Segundo', text: 'Cocinar pescado en hojas de bijao sobre las brasas... no hay nada mas amazónico que eso. Las hierbas y el sabor ahumado son increíbles.' },
    { name: 'Jake', text: 'made this on a camping trip and it was honestly the highlight of the whole weekend. so simple and so tasty' },
  ],
  'recipe-021': [ // Tacu Tacu
    { name: 'Oscar', text: 'Crocante por fuera cremoso por dentro. Ponle un huevo frito encima y lomo saltado al lado. COMBO LETAL' },
    { name: 'Amy Chen', text: 'Best way to use leftover rice and beans. The crispy crust is amazing. Afro-peruvian food is seriously underrated.' },
  ],
  'recipe-022': [ // Sopa de Quinua
    { name: 'Yolanda', text: 'Perfecta para los días fríos en la sierra. Yo le pongo un chorrito de limón y hierbas frescas al servir. Nutritiva y deliciosa!' },
    { name: 'Sam', text: 'healthy, hearty, and actually tastes good. the quinoa gives it such a nice texture. my new winter soup' },
  ],
  'recipe-023': [ // Turrón de Doña Pepa
    { name: 'Carmen Flores', text: 'Hacerlo para el Señor de los Milagros es tradición familiar. Las galletas de anís con la miel de chancaca son divinas. Vale cada minuto de preparación.' },
    { name: 'Susana', text: 'Octubre = turrón!! las grageas de colores encima lo hacen tan festivo. Labor de amor que vale la pena' },
  ],
  'recipe-024': [ // Ensalada de Chonta
    { name: 'Gabriela', text: 'Hearts of palm from the jungle. So fresh and light! simple but delicious with the lime dressing' },
  ],
  'recipe-025': [ // Chapo
    { name: 'Wilmer', text: 'Este batido de plátano es como un abrazo calentito de la Amazonía. Reconfortante y naturalmente dulce. Lo tomábamos todas las mañanas en casa.' },
  ],
  'recipe-026': [ // Pollo a la Brasa
    { name: 'Alejandro Paredes', text: 'El plato nacional!! la marinada con sillao, comino y aji panca es lo que lo diferencia de cualquier otro pollo. Con papas fritas y ensalada. OBLIGATORIO.' },
    { name: 'Katie', text: 'we made a makeshift rotisserie in the backyard and it was SO worth the effort. the green sauce on the side is mandatory!!' },
    { name: 'Paco', text: 'cada familia peruana tiene su version y todos creen q la suya es la mejor jajaja. esta receta se parece mucho al de Pardos' },
    { name: 'Nina Thompson', text: 'The crispy skin with those spices is perfection. Made it for a sunday dinner and there were zero leftovers. Absolute winner.' },
  ],
}

// Rating data unchanged
const ratingData = {
  'recipe-001': [5, 5, 4, 5, 5, 4, 5, 5, 5, 4, 5, 5],
  'recipe-002': [5, 5, 5, 4, 5, 5, 4, 5, 5, 5, 5, 4],
  'recipe-003': [5, 4, 5, 5, 4, 5, 4, 5],
  'recipe-004': [5, 5, 5, 4, 5, 5, 5, 5, 4, 5],
  'recipe-005': [5, 4, 5, 5, 4, 5, 5, 4, 5],
  'recipe-006': [5, 5, 4, 5, 5, 4],
  'recipe-007': [5, 4, 5, 5, 5, 4, 5],
  'recipe-008': [5, 5, 4, 5, 5, 5, 4, 5],
  'recipe-009': [4, 5, 5, 4, 5],
  'recipe-010': [5, 4, 5, 5, 4, 5, 5],
  'recipe-011': [4, 5, 4, 5, 5],
  'recipe-012': [5, 4, 5, 5, 4],
  'recipe-013': [5, 5, 5, 4, 5, 5, 4, 5, 5],
  'recipe-014': [5, 5, 4, 5, 5, 4, 5],
  'recipe-015': [5, 5, 5, 4, 5, 5, 5],
  'recipe-016': [5, 4, 5, 5, 5, 4],
  'recipe-017': [5, 4, 5, 5, 4, 5, 5],
  'recipe-018': [5, 5, 4, 5, 5, 4],
  'recipe-019': [5, 5, 4, 5, 5, 5, 4],
  'recipe-020': [4, 5, 5, 4, 5],
  'recipe-021': [5, 4, 5, 5, 4, 5],
  'recipe-022': [4, 5, 4, 5, 5, 4],
  'recipe-023': [5, 5, 4, 5, 5, 5],
  'recipe-024': [4, 5, 4, 5],
  'recipe-025': [4, 5, 5, 4],
  'recipe-026': [5, 5, 5, 5, 4, 5, 5, 5, 5, 4, 5, 5, 5],
}

function randomDate(daysAgoMin, daysAgoMax) {
  const now = Date.now()
  const min = now - daysAgoMax * 86400000
  const max = now - daysAgoMin * 86400000
  return new Date(min + Math.random() * (max - min))
}

async function seed() {
  // Comments already deleted via: firebase firestore:delete comments --recursive --force
  console.log('Seeding comments...')
  let commentCount = 0
  for (const [recipeId, comments] of Object.entries(commentData)) {
    for (const comment of comments) {
      const date = randomDate(3, 120)
      await addDoc(collection(db, 'comments'), {
        recipeId,
        authorName: comment.name,
        text: comment.text,
        createdAt: Timestamp.fromDate(date),
      })
      commentCount++
      process.stdout.write(`\rComments: ${commentCount}`)
    }
  }
  console.log(`\n✓ Seeded ${commentCount} comments`)

  console.log('Done! (Ratings unchanged)')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
