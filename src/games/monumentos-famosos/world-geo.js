// Simplified world GeoJSON for the Monuments Map Game
// Features: Major countries/regions with simplified outlines
// Coordinates: [longitude, latitude]
// Fixed: corrected self-intersecting polygons for proper rendering

const worldGeo = {
  type: "FeatureCollection",
  features: [
    // ========== NORTH AMERICA ==========
    {
      type: "Feature",
      properties: { name: "Canadá", continent: "América del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-140,60],[-130,55],[-124,49],[-117,49],[-100,49],[-95,49],[-88,48],[-84,46],[-82,43],[-79,43],[-76,44],[-74,45],[-67,47],[-64,44],[-60,46],[-55,47],[-52,47],[-55,52],[-58,55],[-63,58],[-67,60],[-75,62],[-80,64],[-85,66],[-90,68],[-95,70],[-100,73],[-110,75],[-120,73],[-130,70],[-138,69],[-141,70],[-140,60]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Estados Unidos", continent: "América del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-124,49],[-122,46],[-120,39],[-118,34],[-117,32],[-111,31],[-108,31],[-104,32],[-103,29],[-100,28],[-97,26],[-94,29],[-90,29],[-89,30],[-85,30],[-82,25],[-80,25],[-81,31],[-77,35],[-75,38],[-74,40],[-71,42],[-67,45],[-67,47],[-74,45],[-76,44],[-79,43],[-82,43],[-84,46],[-88,48],[-95,49],[-100,49],[-117,49],[-124,49]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Alaska", continent: "América del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-170,54],[-166,54],[-164,55],[-153,57],[-152,58],[-148,60],[-141,60],[-141,70],[-153,72],[-162,70],[-168,66],[-166,61],[-170,57],[-170,54]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "México", continent: "América del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-117,32],[-115,30],[-112,29],[-110,24],[-107,22],[-105,20],[-100,17],[-96,16],[-93,16],[-90,16],[-87,18],[-87,21],[-90,22],[-97,26],[-100,28],[-103,29],[-104,32],[-108,31],[-111,31],[-117,32]
        ]]
      }
    },
    // ========== CENTRAL AMERICA & CARIBBEAN ==========
    {
      type: "Feature",
      properties: { name: "América Central", continent: "América Central" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-90,16],[-89,15],[-87,14],[-86,12],[-84,11],[-83,10],[-82,8],[-77,8],[-77,9],[-79,10],[-83,11],[-84,13],[-85,14],[-87,16],[-90,16]
        ]]
      }
    },
    // ========== SOUTH AMERICA ==========
    {
      type: "Feature",
      properties: { name: "Colombia", continent: "América del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-77,8],[-76,7],[-75,6],[-73,4],[-70,2],[-67,2],[-67,4],[-67,6],[-72,7],[-72,12],[-75,11],[-77,8]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Venezuela", continent: "América del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-72,12],[-70,12],[-67,11],[-64,11],[-61,10],[-60,8],[-63,6],[-65,6],[-67,6],[-67,4],[-67,2],[-70,2],[-73,4],[-72,7],[-72,12]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Brasil", continent: "América del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-60,5],[-55,4],[-52,4],[-50,2],[-48,0],[-44,-2],[-41,-3],[-39,-4],[-35,-5],[-35,-10],[-37,-12],[-39,-15],[-40,-18],[-42,-22],[-44,-23],[-48,-26],[-49,-29],[-52,-33],[-53,-33],[-57,-30],[-58,-25],[-58,-20],[-60,-16],[-63,-15],[-65,-11],[-70,-10],[-73,-7],[-73,-4],[-70,-2],[-70,2],[-67,2],[-67,4],[-67,6],[-63,6],[-60,8],[-60,5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Perú", continent: "América del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-81,-4],[-78,-2],[-75,0],[-73,0],[-73,-4],[-73,-7],[-70,-10],[-70,-14],[-70,-18],[-75,-17],[-80,-7],[-81,-4]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Chile", continent: "América del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-69,-18],[-70,-24],[-70,-28],[-71,-33],[-72,-37],[-73,-42],[-74,-47],[-75,-52],[-70,-54],[-68,-52],[-69,-47],[-71,-42],[-71,-37],[-70,-33],[-69,-28],[-68,-24],[-69,-18]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Argentina", continent: "América del Sur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-69,-18],[-67,-22],[-65,-24],[-64,-27],[-60,-28],[-58,-30],[-58,-34],[-59,-37],[-62,-39],[-65,-42],[-67,-46],[-67,-50],[-69,-52],[-70,-54],[-75,-52],[-74,-47],[-73,-42],[-72,-37],[-71,-33],[-70,-28],[-70,-24],[-69,-18]
        ]]
      }
    },
    // ========== EUROPE ==========
    {
      type: "Feature",
      properties: { name: "Reino Unido", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-5,50],[-3,50],[-1,51],[2,51],[2,53],[0,53],[-1,55],[-2,56],[-3,58],[-5,58],[-6,57],[-5,55],[-4,54],[-3,53],[-5,52],[-5,50]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Irlanda", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-10,51],[-9,52],[-10,53],[-10,54],[-8,55],[-6,55],[-6,54],[-6,52],[-7,52],[-9,51],[-10,51]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Francia", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-2,48],[1,49],[2,51],[3,51],[5,49],[7,49],[8,48],[7,47],[7,44],[6,43],[3,43],[0,43],[-1,44],[-2,47],[-2,48]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "España", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-9,43],[-7,44],[-2,44],[-1,44],[0,43],[3,43],[4,41],[3,40],[1,39],[0,38],[-1,37],[-5,36],[-7,37],[-9,38],[-9,40],[-8,42],[-9,43]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Portugal", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-9,38],[-7,37],[-8,39],[-8,40],[-9,40],[-9,42],[-8,42],[-9,43],[-9,38]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Italia", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [7,44],[8,46],[10,47],[12,47],[14,46],[14,44],[16,42],[16,40],[18,40],[16,38],[15,37],[14,40],[13,41],[12,42],[11,44],[8,45],[7,44]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Sicilia", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [13,37],[14,38],[15,38],[16,38],[14,37],[13,37]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Alemania", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [6,51],[6,49],[7,49],[8,48],[10,48],[12,48],[14,49],[15,51],[15,53],[14,54],[12,54],[10,54],[9,55],[8,54],[6,51]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Grecia", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [20,42],[21,41],[24,41],[26,41],[26,40],[24,38],[23,37],[22,37],[22,38],[20,39],[20,42]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Europa Central", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [14,49],[16,49],[18,49],[20,49],[22,48],[24,48],[24,44],[22,44],[20,42],[18,42],[16,42],[14,44],[14,46],[14,49]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Escandinavia", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [5,58],[6,58],[8,58],[10,58],[12,56],[14,56],[16,57],[18,60],[20,62],[22,64],[24,66],[26,68],[28,70],[22,70],[18,68],[14,68],[12,66],[10,62],[8,60],[5,60],[5,58]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Europa del Este", continent: "Europa" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [22,48],[24,48],[26,48],[28,46],[30,46],[32,46],[34,48],[36,50],[36,54],[34,56],[30,56],[26,54],[24,54],[22,52],[22,48]
        ]]
      }
    },
    // ========== RUSSIA ==========
    {
      type: "Feature",
      properties: { name: "Rusia", continent: "Europa/Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [28,70],[30,56],[34,56],[36,54],[36,50],[40,48],[42,44],[45,42],[48,44],[55,42],[60,42],[65,45],[70,50],[75,55],[80,56],[85,55],[90,55],[100,52],[110,50],[120,53],[128,56],[132,55],[135,50],[140,50],[140,55],[143,52],[150,58],[158,60],[168,65],[180,65],[180,70],[170,72],[160,72],[150,70],[140,68],[130,72],[120,73],[100,73],[80,72],[70,72],[60,70],[50,69],[40,68],[28,70]
        ]]
      }
    },
    // ========== AFRICA ==========
    {
      type: "Feature",
      properties: { name: "Norte de África", continent: "África" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-17,15],[-15,22],[-13,28],[-8,32],[-5,36],[-1,36],[3,37],[8,37],[10,37],[12,34],[15,32],[20,32],[25,31],[30,31],[33,30],[35,30],[37,28],[38,22],[40,15],[35,12],[30,10],[25,10],[20,12],[15,13],[10,12],[5,10],[0,8],[-5,10],[-10,12],[-15,12],[-17,15]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "África Occidental", continent: "África" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-17,15],[-17,12],[-16,10],[-14,8],[-12,6],[-10,5],[-8,5],[-5,5],[0,5],[0,8],[-5,10],[-10,12],[-15,12],[-17,15]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "África Central y del Sur", continent: "África" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [0,5],[5,4],[10,4],[10,2],[10,0],[12,-5],[15,-8],[20,-10],[25,-10],[30,-10],[32,-15],[35,-20],[37,-22],[35,-26],[33,-30],[32,-34],[28,-33],[25,-30],[22,-28],[20,-30],[18,-28],[15,-28],[12,-25],[12,-18],[15,-12],[13,-5],[10,-3],[8,0],[5,3],[0,5]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "África Oriental", continent: "África" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [30,10],[35,12],[38,12],[40,10],[42,11],[45,12],[50,10],[50,5],[48,0],[45,-5],[42,-8],[40,-12],[38,-15],[35,-20],[32,-15],[30,-10],[30,-5],[30,0],[30,5],[30,10]
        ]]
      }
    },
    // ========== MIDDLE EAST ==========
    {
      type: "Feature",
      properties: { name: "Turquía", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [26,41],[28,42],[30,42],[33,42],[36,42],[40,40],[42,38],[44,38],[45,37],[44,36],[40,37],[36,36],[33,36],[30,36],[28,37],[26,38],[26,41]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Oriente Medio", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [33,36],[33,30],[35,30],[37,28],[38,22],[40,15],[42,16],[45,20],[48,24],[50,22],[52,24],[55,22],[57,24],[60,26],[60,30],[55,28],[52,30],[48,35],[45,37],[44,36],[40,37],[36,36],[33,36]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Península Arábiga", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35,30],[38,28],[40,22],[42,16],[44,13],[48,14],[52,16],[55,17],[56,20],[56,24],[52,24],[50,26],[48,30],[45,30],[42,28],[38,30],[35,30]
        ]]
      }
    },
    // ========== ASIA ==========
    {
      type: "Feature",
      properties: { name: "India", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [68,24],[70,28],[72,32],[74,35],[76,35],[78,33],[80,30],[82,28],[85,28],[88,28],[90,26],[92,22],[90,18],[85,14],[80,8],[78,10],[76,12],[74,15],[72,20],[68,24]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "China", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [75,40],[78,35],[80,30],[85,28],[88,28],[90,28],[92,27],[95,28],[98,24],[100,22],[104,22],[106,20],[108,22],[110,20],[115,23],[118,25],[120,28],[122,30],[124,34],[127,38],[128,42],[124,43],[122,46],[120,50],[115,48],[110,45],[105,42],[100,42],[95,44],[90,45],[85,42],[80,42],[75,40]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Asia Central", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [42,44],[45,42],[48,44],[50,42],[55,42],[60,42],[65,42],[70,42],[75,40],[80,42],[85,42],[80,45],[75,45],[70,50],[65,45],[60,42],[55,42],[50,42],[48,44],[42,44]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Japón", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [130,31],[131,33],[132,34],[134,35],[136,36],[138,38],[140,40],[141,42],[142,44],[141,45],[140,43],[139,40],[138,37],[136,35],[134,33],[132,33],[130,31]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Corea", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [125,34],[126,36],[127,38],[128,38],[129,37],[129,35],[128,34],[126,34],[125,34]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Sudeste Asiático", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [98,24],[100,22],[102,20],[104,18],[106,16],[106,12],[106,10],[108,12],[108,16],[106,20],[104,22],[100,22],[98,16],[98,12],[100,8],[102,4],[104,2],[105,0],[102,-2],[100,-1],[98,2],[96,6],[98,10],[98,16],[98,20],[98,24]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Indonesia", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [95,6],[98,4],[100,2],[104,0],[106,-2],[108,-6],[110,-8],[112,-8],[114,-8],[116,-8],[118,-8],[120,-5],[122,-3],[125,-3],[128,-5],[130,-6],[132,-5],[135,-4],[138,-6],[140,-6],[140,-3],[135,-2],[130,-2],[125,0],[120,0],[115,2],[110,3],[108,2],[105,3],[100,4],[95,6]
        ]]
      }
    },
    // ========== OCEANIA ==========
    {
      type: "Feature",
      properties: { name: "Australia", continent: "Oceanía" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [115,-35],[116,-33],[117,-32],[115,-22],[119,-18],[122,-17],[127,-14],[130,-12],[133,-12],[136,-12],[138,-16],[140,-18],[145,-15],[148,-18],[150,-22],[152,-25],[154,-28],[153,-30],[151,-34],[148,-38],[145,-39],[140,-38],[137,-35],[135,-35],[132,-33],[130,-32],[128,-33],[124,-34],[120,-34],[117,-35],[115,-35]
        ]]
      }
    },
    {
      type: "Feature",
      properties: { name: "Nueva Zelanda", continent: "Oceanía" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [172,-34],[174,-36],[176,-38],[178,-42],[176,-44],[172,-45],[170,-44],[168,-44],[167,-45],[166,-46],[168,-47],[170,-46],[172,-44],[174,-42],[176,-40],[175,-38],[174,-36],[172,-34]
        ]]
      }
    },
    // ========== GREENLAND ==========
    {
      type: "Feature",
      properties: { name: "Groenlandia", continent: "América del Norte" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-55,60],[-48,60],[-42,62],[-35,65],[-22,70],[-18,73],[-20,76],[-25,78],[-35,80],[-45,82],[-50,80],[-55,78],[-58,75],[-60,72],[-55,68],[-52,65],[-55,60]
        ]]
      }
    },
    // ========== MONGOLIA ==========
    {
      type: "Feature",
      properties: { name: "Mongolia", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [88,50],[92,50],[100,50],[105,48],[110,48],[115,48],[120,50],[115,46],[110,45],[105,42],[100,42],[95,44],[90,46],[88,50]
        ]]
      }
    },
    // ========== CAMBODIA ==========
    {
      type: "Feature",
      properties: { name: "Camboya", continent: "Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [103,14],[104,14],[106,14],[107,13],[107,11],[106,10],[104,10],[103,11],[103,14]
        ]]
      }
    }
  ]
};

export default worldGeo;
