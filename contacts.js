const fs = require("fs").promises;
const { writeFile } = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "/db/contacts.json");

const getContacts = () => {
  return fs
    .readFile(contactsPath)
    .then((response) => {
      const data = response.toString();
      const dataJson = JSON.parse(data);
      return dataJson;
    })
    .catch((error) => console.log(error));
};
function listContacts() {
  fs.readFile(contactsPath)
    .then((response) => {
      const data = response.toString();
      const dataObject = JSON.parse(data);
      console.table(dataObject);
    })
    .catch((error) => console.log(error));
}
function getContactsById(contactId) {
  return getContacts()
    .then((response) => {
      const contact = response.find(
        (contact) => contact.id.toString() === contactId.toString()
      );
      console.log(contact);
    })
    .catch((error) => console.log(error));
}
function removeContact(contactId) {
  getContacts()
    .then((response) => {
      const contactsData = response.filter(
        (contact) => contact.id.toString() !== contactId.toString()
      );
      for (let i = 0; i < contactsData.length; i++) {
        contactsData[i].id = i + 1;
      }
      const newContactsArray = JSON.stringify(contactsData);
      fs.writeFile(contactsPath, newContactsArray);
    })
    .catch((error) => console.log(error));
}
function addContact(name, email, phone) {
  getContacts()
    .then((response) => {
      const contact = { id: 0, name: name, email: email, phone: phone };
      response.push(contact);
      for (let i = 0; i < response.length; i++) {
        response[i].id = i + 1;
      }
      const newContactsArray = JSON.stringify(response);
      fs.writeFile(contactsPath, newContactsArray);
    })
    .catch((error) => console.log(error));
}
module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
};
