// Vi henter elemtenter fra html
const items_container = document.getElementById("items");
const item_template = document.getElementById("itemTemplate");
const add_button = document.getElementById("add");

// getItems() henter to-do items fra vores localStorage, og hvis der ikke er noget gemt endnu, så vises vores tomme array [].
let items = getItems();

// JSON.parse konventerer den gemte tekststreng (to-do items) tilbage til et js-array.
function getItems() {
  return JSON.parse(localStorage.getItem("todo-test") || "[]");
}

// setItems() gemmer vores liste items i browseren. 
// JSON.stringify gør arrayet til en string idet at localStorage kun kan gemme tekst, altså strings.
function setItems() {
  localStorage.setItem("todo-test", JSON.stringify(items));
}

// funktion til at tilføje to-do tasks. 
// Når man klikker på add-task knappen, så kaldes addItem()
// Et nyt objekt (const newItem) oprettes så, med en beskrivelse (description) og status som er false for nu.
function addItem() {
  const newItem = {
    description: "add new task",
    completed: false
  };

  //setItems() gemmer den opdaterede liste i browseren. 
  //refreshList() opdaterer selve HTML-listen, så det nye item vises.
  items.push(newItem);
  setItems();
  refreshList();
}

// Funktion så vores liste opdateres
function refreshList() {

  // Når man tjekker en to do task af, så smides den nederst 
  items.sort((a, b) => a.completed - b.completed);

  items_container.innerHTML = "";

  // Looper gennem alle items
  for (const item of items) {
    const itemElement = item_template.content.cloneNode(true);
    const li = itemElement.querySelector("li");
    const checkbox = itemElement.querySelector(".item_completed");
    const text = itemElement.querySelector(".item_text");
    const deleteBtn = itemElement.querySelector(".delete_btn");

    text.textContent = item.description;
    checkbox.checked = item.completed;

    if (item.completed) {
      li.classList.add("completed");
    }

// Kode til når man tjekker en to-do item af 
// listen gemmes i localStorage og opdateres med refreshList().
    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      setItems();
      refreshList();
    });

// Når man klikker og redigerer på input feltet. 
//Hvis man klikker på teksten, erstattes den med et <input>-felt, så man kan redigere. 
//Når input mister fokus (blur), gemmes ændringen, og listen opdateres.
    text.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = item.description;

      input.addEventListener("blur", () => {
        item.description = input.value;
        setItems();
        refreshList();
      });

      li.replaceChild(input, text);
      input.focus();
    });

    // delete knappen
    // Når man trykker på garbage knappen, så slettes to do task'en. 
    //filter() fjerner item fra arrayet. 
    //Listen gemmes og opdateres.
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // forhindrer klik på li
      items = items.filter(i => i !== item);
      setItems();
      refreshList();
    });

    items_container.append(itemElement);
  }
}

// Når brugeren klikker på vores add-knap, så kaldes addItem
add_button.addEventListener("click", addItem);

refreshList();
