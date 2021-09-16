var receptek = [];
var sorID;
var irany = false;
var nevID;
var txt;
$(function () {
  $.ajax({
    url: "etelek.json",
    success: function (result) {
      console.log(result);
      receptek = result.receptkonyv;
      console.log(receptek);
      $("article").append(receptek.nev);
      megjelenit();
    },
  });
});

function megjelenit() {
  /** az adatok megjelenitése táblázatban*/
  $("article").empty();
  $("article").append("<table>");
  txt ="<tr id= 'fejlec'><th>Név</th><th>elkészítési idő</th><th>kép</th><th>leírás</th><th>Hozzávalók</th></tr>";
  for (var i = 0; i < receptek.length; i++) {
    txt += "<tr id='" + i + "'>";
    for (var oszlopok in receptek[i]) {
      if (oszlopok === "hozzavalok") {
        txt += "<td>";
        for (var j = 0; j < receptek[i][oszlopok].length; j++) {
            for (var osszetevo in receptek[i][oszlopok][j]) {
                txt +=osszetevo + ": " +receptek[i][oszlopok][j][osszetevo]+"<br />";
            }
        }
        txt += "</td>";
      } else {
        txt += "<td>" + receptek[i][oszlopok] + "</td>";
      }
    }
    txt += "</tr>";
  }

  $("article table").append(txt);
  $("article table tr").hover(hatter);
  $("tr").on("click", kepMegjelenit);
  //$(".kep").append(receptek[0].kep);
  //$("article").append("<td>"+receptek[0].nev+"</td><td>"+receptek[0].elkIdo+"</td><td>"+receptek[0].kep+"</td><td>"+receptek[0].leiras+"</td>");*/
  //$("article").append(receptek[0]["nev"]);
}
function hatter() {
  console.log($(this).attr("id"));
  $(this).toggleClass("hatter");
}

function kepMegjelenit() {
  if ($(this).attr("id") !== "fejlec") {
    sorID = Number($(this).attr("id"));
    //console.log(receptek[sorID].kep);
    $(".kep img").attr("src", receptek[sorID].kep);
    $(".kep p").empty();
    $(".kep p").append(receptek[sorID].nev);
  } else {
    rendez();
  }
  $(".jobb").click(function () {
    //console.log("helo");
    $(".kep img").attr("src", receptek[sorID].kep);
    sorID--;
    if (sorID < 0) {
      sorID = receptek.length - 1;
    }
  });

  $(".bal").click(function () {
    //console.log("helo");
    $(".kep img").attr("src", receptek[sorID].kep);
    sorID++;
    if (sorID > receptek.length - 1) {
      sorID = 0;
    }
  });
}

function rendez() {
  var sor = "nev";
  if (irany) {
    receptek.sort(function (a, b) {
      merre = Number(b[sor] > a[sor]) - 0.5;
      return merre;
    });
  } else {
    receptek.sort(function (a, b) {
      merre = Number(b[sor] < a[sor]) - 0.5;
      return merre;
    });
  }
  irany = !irany;
  megjelenit();
}
