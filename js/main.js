document.addEventListener('DOMContentLoaded', onDocumentLoad);
window.addEventListener('load', onDocumentLoad);

function onDocumentLoad() {
    const container = document.querySelector('.container');

    const regions = {
      kirklareli: { x: 5.5, y: 12, width: 3, height: 3, neighbors: ['edirne', 'tekirdag','istanbul'] },
      edirne: { x: 2.5, y: 18, width: 2, height: 3, neighbors: ['kirklareli', 'tekirdag'] },
      tekirdag: { x: 4.5, y: 20, width: 3, height: 3, neighbors: ['kirklareli', 'edirne','istanbul'] },
      istanbul: { x: 9, y: 20, width: 3, height: 3, neighbors: ['kirklareli', 'tekirdag'] },
      canakkale: { x: 2.5, y: 33, width: 3.5, height: 3, neighbors: ['balikesir'] },
      balikesir: { x: 6, y: 39, width: 3, height: 3, neighbors: ['manisa','bursa','canakkale'] },
      bursa: { x: 10, y: 34, width: 3, height: 3, neighbors: ['balikesir','kutahya','bilecik','yalova'] },
      manisa: { x: 7, y: 50, width: 3, height: 3, neighbors: ['balikesir','izmir','usak','kutahya'] },
      izmir: { x: 4.3, y: 56, width: 2, height: 3, neighbors: ['manisa','aydin'] },
      aydin: { x: 7, y: 64, width: 2, height: 3, neighbors: ['mugla','denizli','manisa','izmir'] },
      afyon: { x: 17, y: 54, width: 3, height: 3, neighbors: ['isparta','burdur','denizli','usak','kutahya','eskisehir','konya'] },
      mugla: { x: 7, y: 71, width: 2, height: 3, neighbors: ['aydin','denizli','burdur','antalya'] },
      denizli: { x: 11, y: 65, width: 2, height: 3, neighbors: ['mugla','aydin','burdur','manisa','usak','afyon'] },
      burdur: { x: 14, y: 68.5, width: 3, height: 3, neighbors: ['antalya','mugla','denizli','afyon'] },
      antalya: { x: 17, y: 75, width: 3, height: 3, neighbors: ['mugla','burdur','isparta','konya','karaman','mersin'] },
      usak: { x: 12, y: 54, width: 2, height: 3, neighbors: ['denizli','kutahya','manisa','afyon'] },
      kutahya: { x: 13, y: 45, width: 3, height: 3, neighbors: ['usak','manisa','balikesir','bursa','bilecik','eskisehir','afyon'] },
      bilecik: { x: 15, y: 34, width: 2, height: 3, neighbors: ['kutahya','bursa','sakarya','bolu','eskisehir'] },
      isparta: { x: 17, y: 63, width: 3, height: 3, neighbors: ['antalya','burdur','afyon','konya'] },
      eskisehir: { x: 18, y: 41, width: 3, height: 3, neighbors: ['afyon','kutahya','bilecik','bolu','ankara','konya'] },
      ankara: { x: 23, y: 39, width: 4, height: 3, neighbors: ['konya', 'eskisehir', 'bolu', 'aksaray', 'cankiri', 'kirikkale', 'kirsehir'] },
      bolu: { x: 21, y: 28, width: 3, height: 3, neighbors: ['ankara', 'eskisehir', 'bilecik', 'sakarya', 'duzce', 'zonguldak', 'karabuk', 'cankiri'] },
      duzce: { x: 19, y: 27, width: 1, height: 3, neighbors: ['zonguldak','bolu','sakarya'] },
      sakarya: { x: 17, y: 27, width: 1.5, height: 3, neighbors: ['duzce','bolu','bilecik','yalova','kocaeli'] },
      kocaeli: { x: 14, y: 26, width: 2, height: 2, neighbors: ['yalova','sakarya'] },
      yalova: { x: 13, y: 29, width: 2, height: 2, neighbors: ['bursa','kocaeli','sakarya'] }
      //diğer iller...
    };

    const coloredAreas = Object.keys(regions).map(regionName => {
        return { ...regions[regionName], regionName, color: null };
    });

    const colors = ['blue', 'yellow', 'green', 'red'];

    function assignColors() {
        coloredAreas.forEach(area => {
            const neighbors = coloredAreas.filter(otherArea => area.neighbors.includes(otherArea.regionName));
            const neighborColors = neighbors.map(neighbor => neighbor.color);

            for (const color of colors) {
                if (!neighborColors.includes(color)) {
                    area.color = color;
                    break;
                }
            }
        });
    }

    assignColors();

    coloredAreas.forEach(area => {
        const overlay = document.createElement('div');
        overlay.classList.add('color-overlay', `${area.color}-overlay`);
        overlay.style.left = area.x + '%';
        overlay.style.top = area.y + '%';
        overlay.style.width = area.width + '%';
        overlay.style.height = area.height + '%';
        overlay.setAttribute('data-region-name', area.regionName);
        container.appendChild(overlay);
    });
}
