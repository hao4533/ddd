function checkKey(event) {
  var key = event.which || event.keyCode;
  if (key == 13) {
    doSearch();
  }
}

function doSearch() {
  var frm = document.forms["frm-search"];
  if (frm.words.value.length > 0) frm.submit();
}

function showSearch() {
  var url = new URL(window.location);
  var ws = url.searchParams.get("words");
  document.getElementById("searchDetail").innerHTML =
    "<h1>Từ khóa tìm kiếm</h1> <b>" + ws + "</b>";
}

function loginValidate(frm) {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailReg.test(frm.email.value)) {
    alert("Vui lòng nhập email hợp lệ.");
    frm.email.focus();
    return false;
  }
  if (frm.psw.value.length < 8) {
    alert("Mật khẩu có tối thiểu 8 ký tự.");
    frm.psw.focus();
    return false;
  }
  alert("Đã gửi dữ liệu Đăng nhập.");
  return true;
}

function registerValidate(frm) {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailReg.test(frm.email.value)) {
    alert("Vui lòng nhập email hợp lệ.");
    frm.email.focus();
    return false;
  }
  if (frm.psw.value.length < 8) {
    alert("Mật khẩu có tối thiểu 8 ký tự.");
    frm.psw.focus();
    return false;
  }
  if (frm.psw2.value.length === 0) {
    alert("Vui lòng nhập lại mật khẩu.");
    frm.psw2.focus();
    return false;
  }
  if (frm.psw.value !== frm.psw2.value) {
    alert("Mật khẩu và Nhập lại mật khẩu phải giống nhau.");
    frm.psw.focus();
    return false;
  }
  alert("Đã gửi dữ liệu Đăng ký.");
  return true;
}
function openCart() {
  window.location.href = "donhang.html";
}
function addCart(code) {
  let number = parseInt(document.getElementById(code).value);
  if (number == 0) return;
  if (typeof localStorage[code] === "undefined") {
    window.localStorage.setItem(code, number);
    alert("Đặt hàng thành công. Tổng số lượng đã đặt là: " + number + ".");
  } else {
    current = parseInt(window.localStorage.getItem(code));
    if (number + current > 100) {
      window.localStorage.setItem(code, 100);
      alert(
        "Tổng số lượng đặt hàng không thể vượt quá 100. Đặt hàng với số lượng: " +
          (100 - current) +
          "."
      );
      return;
    } else {
      window.localStorage.setItem(code, number + current);
      alert(
        "Đặt hàng thành công. Tổng số lượng đã đặt là: " +
          (number + current) +
          "."
      );
    }
  }
}
function openCart() {
  window.location.href = "donhang.html";
}

var itemList = {
  sp001: {
    name: "Sữa Chua Vị Kiwi",
    price: "2100",
    photo: "images/sanpham/kiwi.jpg",
  },
};
function getDiscountRate() {
  var d = new Date();
  var weekday = d.getDate();
  var totalMins = d.getHours() * 60 + getMinutes();
  if (
    weekday >= 1 &&
    weekday <=
      3(
        (totalMins >= 420 && totalMins <= 660) ||
          (totalMins >= 780 && totalMins <= 1020)
      )
  )
    return 0.1;
  return 0;
}

function showCart() {
  var tbody = document
    .getElementById("cartDetail")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  var formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  var totalPreTax = 0;
  for (let i = 0; i < window.localStorage.length; i++) {
    if (typeof itemList[localStorage.key(i)] === "undefined") continue;
    var key = window.localStorage.key(i);
    var item = itemList[key];
    var qty = localStorage.getItem(key);

    var photo = document.createElement("td");
    photo.innerHTML = "<img src='" + item.photo + "' width='100px'/>";
    photo.style.textAlign = "center";

    var name = document.createElement("td");
    name.innerHTML = item.name;

    var quantity = document.createElement("td");
    quantity.innerHTML = qty;
    quantity.style.textAlign = "right";

    var price = document.createElement("td");
    price.innerHTML = formatter.format(item.price);
    price.style.textAlign = "right";

    var total = document.createElement("td");
    total.innerHTML = formatter.format(item.price * qty);
    total.style.textAlign = "right";
    totalPreTax += item.price * qty;

    var bin = document.createElement("a");
    bin.innerHTML = "<i class='fa fa-trash trash-icon'></i>";
    bin.setAttribute("href", "#");
    bin.setAttribute("data-code", key);
    bin.onclick = function () {
      removeCart(this.dataset.code);
    };

    var rm = document.createElement("td");
    rm.appendChild(bin);
    rm.style.textAlign = "center";

    var row = document.createElement("tr");
    row.appendChild(photo);
    row.appendChild(name);
    row.appendChild(quantity);
    row.appendChild(price);
    row.appendChild(total);
    row.appendChild(rm);

    tbody.appendChild(row);
  }
  var discountRate = getDiscountRate();
  var discount = totalPreTax * discountRate;
  var tax = 0.1 * (totalPreTax - discount);
  document.getElementById("bill_totalpretax").innerHTML =
    formatter.format(totalPreTax);
  document.getElementById("bill_discount").innerHTML =
    discountRate + " x A = " + formatter.format(discount);
  document.getElementById("bill_tax").innerHTML = formatter.format(tax);
  document.getElementById("bill_total").innerHTML = formatter.format(
    totalPreTax - discount + tax
  );
}

function removeCart(code) {
  if (typeof window.localStorage[code] !== "undefined") {
    window.localStorage.removeItem(code);
    document
      .getElementById("cartDetail")
      .getElementsByTagName("tbody")[0].innerHTML = "";
    showCart();
  }
}
