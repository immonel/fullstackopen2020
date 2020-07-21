const mongoose = require('mongoose')

if (process.argv.length<3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.x2izh.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
	Person.find({}).then(result => {
		console.log('phonebook:')
		result.forEach(person => console.log(person.name, person.number))
		mongoose.connection.close()
	})
} else if (process.argv.length === 5) {
	const name = process.argv[3]
	const number = process.argv[4]

	const person = new Person({ name, number })
	person.save().then(() => {
		console.log(`Added ${name} (${number}) to phonebook`)
		mongoose.connection.close()
	})
} else {
	console.log('Invalid number of arguments!')
	mongoose.connection.close()
}