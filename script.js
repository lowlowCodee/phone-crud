let getId = (id) => { return document.getElementById(id) };

let editIndex = -1;

let phones = JSON.parse(localStorage.getItem('phones')) || [];

function saveDataLocalStorage() {
    localStorage.setItem('phones', JSON.stringify(phones));
}
getId('search').addEventListener('keyup', function () {
    let searchTerm = this.value;
    populateTable(searchTerm);
});


function populateTable(searchTerm = '') {
    let tableList = getId('phone-list');
    tableList.innerHTML = '';

    let filteredPhones = phones.filter(phone => {
        return Object.values(phone).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    if (filteredPhones.length === 0) {
        let noRec = document.createElement('tr');
        noRec.innerHTML = `<td class="text-center fw-bolder" colspan="10">No Records</td>`;
        tableList.append(noRec);
    }

    for (let i = 0; i < filteredPhones.length; i++) {
        let phone = filteredPhones[i];

        let Rows = document.createElement('tr');
        Rows.innerHTML = `
            <td>${i + 1}</td>
            <td>${phone.model}</td>
            <td>${phone.brand}</td>
            <td>${phone.chipset}</td>
            <td>${phone.ram}</td>
            <td>${phone.rom}</td>
            <td>${phone.display}</td>
            <td class="colorCell">${phone.color}</td>
            <td>${phone.battery}</td>
            <td>
                <button class="btn btn-warning mt-1 edit" data-bs-toggle="modal" data-bs-target="#phoneModal">
                    <ion-icon name="create-outline"></ion-icon>
                </button>
                <button class="btn btn-danger mt-1 delete">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>
        `;

        let colorCell = Rows.querySelector('.colorCell');
        let color = phone.color.toLowerCase();
        if (color === 'black') {
            colorCell.style.backgroundColor = 'Black';
            colorCell.style.color = 'white';
        }

        Rows.querySelector('.edit').addEventListener('click', function () {
            getId('model').value = phone.model;
            getId('brand').value = phone.brand;
            getId('chipset').value = phone.chipset;
            getId('ram').value = phone.ram;
            getId('rom').value = phone.rom;
            getId('display').value = phone.display;
            getId('color').value = phone.color;
            getId('battery').value = phone.battery;
            editIndex = phones.indexOf(phone);
        });

        Rows.querySelector('.delete').addEventListener('click', function () {
            let cnfrm = confirm('Are you sure you want to delete?');
            if (cnfrm) {
                showAlert('Deleted successfully', 'danger');
                phones.splice(phones.indexOf(phone), 1);
                saveDataLocalStorage();
                populateTable();
            }
        });

        tableList.append(Rows);
    }
}


populateTable();

getId('phoneForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let model = getId('model').value.trim();
    let brand = getId('brand').value.trim();
    let chipset = getId('chipset').value.trim();
    let ram = getId('ram').value.trim();
    let rom = getId('rom').value.trim();
    let display = getId('display').value.trim();
    let color = getId('color').value.trim();
    let battery = getId('battery').value.trim();

    let phone = {
        model: model,
        brand: brand,
        chipset: chipset,
        ram: ram,
        rom: rom,
        display: display,
        color: color,
        battery: battery,
    }

    if (model === '' || brand === '' || chipset === '' || ram === '' || rom === '' || display === '' || color === '' || battery === '') {
        showAlertModal('Please fill all empty fields', 'danger');
        return;
    }

    if (editIndex === -1) {
        showAlert('successfully added', 'success');
        getId('close').click();
        phones.push(phone);
    } else {
        showAlert('successfully Edited', 'info');
        getId('close').click();
        phones[editIndex] = phone;
        editIndex = -1
    }

    saveDataLocalStorage();
    populateTable();


    getId('model').value = '';
    getId('brand').value = '';
    getId('chipset').value = '';
    getId('ram').value = '';
    getId('rom').value = '';
    getId('display').value = '';
    getId('color').value = '';
    getId('battery').value = '';

});

function showAlert(message, type) {

    let alert = getId('alert');
    alert.innerHTML = message;
    alert.className = `alert alert-${type}`;
    alert.classList.remove('d-none');

    setTimeout(function () {
        alert.classList.add('d-none');
    }, 1700);
}

function showAlertModal(message, type) {

    let alert = getId('alertModal');
    alert.innerHTML = message;
    alert.className = `alert alert-${type}`;
    alert.classList.remove('d-none');

    setTimeout(function () {
        alert.classList.add('d-none');
    }, 1700);
}