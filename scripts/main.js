
// https://ecommercenapratica.com/o-que-e-o-codigo-ean-e-como-criar-o-seu/

// País de origem (Amarelo) – 3 primeiros dígitos (o do Brasil é o 789);
// Empresa Fabricante (Vermelho) – 4,5 ou 6 dígitos;
// Produto por ela produzido (Rosa) – 3,4 ou 5 dígitos;
// Dígito verificador (Branco) – 1 dígito.

function unique(list) { return list.filter((value, index, self) => self.indexOf(value) === index) }

function getDigit(ean) {
  if (ean.length > 12) {
    ean = ean.slice(0, 12)
  } else if (ean.length != 12) {
    return null
  }

  digits = ean.split("");
  amount = 0;

  digits.forEach((digit, i) => {
    amount += digit * ((i % 2) === 0 ? 1 : 3)
  })

  result = Math.floor(amount / 10) + 1;
  result *= 10;
  result -= amount;

  return (result % 10) == 0 ? 0 : result;
}

function validateEAN13Barcode(ean) {
  checkDigit = getDigit(ean);

  if (checkDigit == null) {
    return false
  }

  return checkDigit == ean[12]
}

// generateEan("789")
function generateEan(country = null) {
  total_length = 12
  ean = ""

  if (country) {
    ean += country
    total_length -= 3
  }

  for (let i = 0; i < total_length; i++) {
    ean += `${parseInt(Math.random() * 10)}`
  }

  return `${ean}${getDigit(ean)}`
}

// generateManyEans(50, "789")
function generateManyEans(amount, country = null) {
  results = []

  while (results.length < amount) {
    results = unique(results.concat(generateEan(country)))
  }

  return results
}

function clearTable(table) {
  while (table.children.length > 0) {
    for (row of table.children) {
      console.log(row)
      row.remove()
    }
  }
}

function displayEan() {
  table = document.getElementById("eanTable")

  clearTable(table)

  quantity = document.getElementById("inputGroupSelect01").value
  quantity = parseInt(quantity)

  eans = generateManyEans(quantity, "789")

  console.log(eans)

  eans.forEach((e, i) => {
    row = table.insertRow();

    index = row.insertCell(0);
    ean = row.insertCell(1);

    index.innerHTML = i + 1;
    ean.innerHTML = e;
  });

  return false
}