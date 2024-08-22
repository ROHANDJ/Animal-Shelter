// class Animal {
//     constructor(name, type, age) {
//         this.name = name;
//         this.type = type;
//         this.age = age;
//         this.adopted = false;
//     }
// }

// class AnimalShelter {
//     constructor() {
//         this.animals = JSON.parse(localStorage.getItem('animals')) || [];
//         this.nameIndex = this.animals.reduce((acc, animal, index) => {
//             acc[animal.name] = index;
//             return acc;
//         }, {});
//     }

//     addAnimal(name, type, age) {
//         const animal = new Animal(name, type, age);
//         this.animals.push(animal);
//         this.nameIndex[name] = this.animals.length - 1;
//         localStorage.setItem('animals', JSON.stringify(this.animals));
//     }

//     displayAnimals(animalList) {
//         if (this.animals.length === 0) {
//             animalList.innerHTML = '<p>No animals in the shelter.</p>';
//             return;
//         }

//         animalList.innerHTML = '<h3>Animals in the shelter:</h3>';
//         this.animals.forEach(animal => {
//             animalList.innerHTML += `<p>Name: ${animal.name}, Type: ${animal.type}, Age: ${animal.age}, Adopted: ${animal.adopted ? 'Yes' : 'No'}</p>`;
//         });
//     }

//     adoptAnimal(name) {
//         const index = this.nameIndex[name];
//         if (index !== undefined && !this.animals[index].adopted) {
//             this.animals[index].adopted = true;
//             alert(`Congratulations! ${name} has been adopted.`);
//             localStorage.setItem('animals', JSON.stringify(this.animals));
//         } else {
//             alert(`Sorry, ${name} is not available for adoption.`);
//         }
//     }
// }



// const shelter = new AnimalShelter();
// const adoptionSystem = new AdoptionSystem();

// function addAnimal() {
//     const form = document.getElementById('animalForm');
//     const name = form.elements['name'].value;
//     const type = form.elements['type'].value;
//     const age = form.elements['age'].value;

//     shelter.addAnimal(name, type, age);
//     form.reset();
// }

// function displayAnimals() {
//     const animalList = document.getElementById('animalList');
//     shelter.displayAnimals(animalList);
// }

// function adoptAnimal() {
//     const form = document.getElementById('adoptionForm');
//     const name = form.elements['adoptName'].value;

//     shelter.adoptAnimal(name);
//     form.reset();
// }

// function addPerson() {
//     const form = document.getElementById('adopterForm');
//     const person = {
//         name: form.elements['adopterName'].value,
//         age: parseInt(form.elements['adopterAge'].value),
//         income: parseFloat(form.elements['adopterIncome'].value),
//         hasOwnHouse: form.elements['adopterHouse'].checked,
//     };

//     adoptionSystem.enqueuePerson(person);
//     form.reset();
// }

// function checkEligibility() {
//     const eligibleAdopters = adoptionSystem.checkEligibility();
//     const eligibleAdoptersDiv = document.getElementById('eligibleAdopters');
//     eligibleAdoptersDiv.innerHTML = '';

//     if (eligibleAdopters.length > 0) {
//         eligibleAdoptersDiv.innerHTML = '<h3>Eligible Adopters:</h3>';
//         eligibleAdopters.forEach(adopter => {
//             eligibleAdoptersDiv.innerHTML += `<p>${adopter.name}</p>`;
//         });
//     } else {
//         eligibleAdoptersDiv.innerHTML = '<p>No eligible adopters found.</p>';
//     }
// }

// function login() {
//     const form = document.getElementById('loginForm');
//     const username = form.elements['username'].value;
//     const password = form.elements['password'].value;

//     // Dummy validation
//     if (username === 'admin' && password === 'password') {
//         window.location.href = 'index.html';
//     } else {
//         alert('Invalid credentials. Please try again.');
//     }
// }
