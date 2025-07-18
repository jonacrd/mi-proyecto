document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    // Selecciona todos los items excepto window5 (el núcleo)
    const items = Array.from(container.querySelectorAll(
      '.portfolio:not(.window5), .window1, .window2, .window3, .window4, .window6, .window7, .window8, .window9'
    ));
    const window5 = container.querySelector('.window5');

    // Posiciones finales normalizadas (0-1)
    // finalPositions debe coincidir con el orden de items
    const finalPositions = [
        { x: 0.15, y: 0.2 }, // window1
        { x: 0.55,  y: 0.2 }, // window2
        { x: 0.85, y: 0.2 }, // window3
        { x: 0.1,  y: 0.5 }, // window4
        { x: 0.9,  y: 0.5 }, // window6
        { x: 0.15, y: 0.8 }, // window7
        { x: 0.5,  y: 0.85 }, // window8
        { x: 0.85, y: 0.8 }  // window9
    ];

    // window5 se anima aparte en el centro
    const window5Final = { x: 0.5, y: 0.5 };

    // Esquinas de inicio
    const corners = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
    ];

    function animateItemFromCorner(item, finalPos, corner, duration, delay, finalDeform = {}) {
        const rect = container.getBoundingClientRect();

        // Si corner.x está entre 0 y 1, calcula la posición relativa al ancho
        // Si corner.y está entre 0 y 1, calcula la posición relativa al alto
        // Si quieres que salgan fuera del viewport, ajusta el valor multiplicando por >1 o <0

        // Para window2 (centro arriba), queremos que salga desde arriba fuera del viewport, centrado
        // Para window8 (centro abajo), queremos que salga desde abajo fuera del viewport, centrado

        let startX, startY;
        if (corner.x === 0) startX = -rect.width * 0.4;
        else if (corner.x === 1) startX = rect.width * 1.2;
        else startX = rect.width * corner.x; // centro u otro punto

        if (corner.y === 0) startY = -rect.height * 0.2;
        else if (corner.y === 1) startY = rect.height * 1.4;
        else startY = rect.height * corner.y; // centro u otro punto

        const endX = finalPos.x * rect.width;
        const endY = finalPos.y * rect.height;

        let start = null;
        function step(ts) {
            if (!start) start = ts;
            const elapsed = ts - start - delay;
            if (elapsed < 0) {
                requestAnimationFrame(step);
                return;
            }
            const progress = Math.min(elapsed / duration, 1);
            const eased = 0.5 * (1 - Math.cos(Math.PI * progress));

            const x = startX * (1 - eased) + endX * eased;
            const y = startY * (1 - eased) + endY * eased;

            // Deformación y rotación por gravedad
            const scale = 1.2 - 0.2 * eased;
            const rotate = (1 - eased) * 45 + (finalDeform.rotate || 0);
            const skewX = (finalDeform.skewX || 0) * eased;
            const skewY = (finalDeform.skewY || 0) * eased;

            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            item.style.opacity = 1;
            item.style.position = 'absolute';
            item.style.zIndex = 10;
            item.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg)`;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                item.style.left = `${endX}px`;
                item.style.top = `${endY}px`;
                item.style.transform = `translate(-50%, -50%) scale(1) rotate(${finalDeform.rotate || 0}deg) skew(${finalDeform.skewX || 0}deg, ${finalDeform.skewY || 0}deg)`;
                item.style.zIndex = 5;
                // NO CAMBIES border-radius aquí
                item.classList.add('bubble-jelly');
                item.style.animationDelay = `${Math.random() * 10}s`;
                item.style.animationDuration = `${12 + Math.random() * 8}s`;
            }
        }
        requestAnimationFrame(step);
    }

    function animateAll() {
        // Animar todos los items desde esquinas a posiciones finales
        // En animateAll, asegúrate que window6 tenga el delay y esquina correctos
        // Oculta todos los items antes de animarlos
items.forEach(item => {
    item.style.opacity = 0;
    item.style.left = '-9999px';
    item.style.top = '-9999px';
    item.style.position = 'absolute';
    item.style.transform = 'translate(-50%, -50%) scale(0.3)';
    item.style.zIndex = 1;
    item.style.borderRadius = '50% 60% 55% 45% / 60% 50% 40% 55%';

});

        items.forEach((item, i) => {
            const final = finalPositions[i];
            const customCorners = [
                corners[0],                  // window1 - sup izq
                { x: 0.5, y: 0 },            // window2 - CENTRO ARRIBA (saldrá desde arriba, centrado)
                corners[1],                  // window3 - sup der
                corners[0],                  // window4 - sup izq
                corners[2],                  // window6 - inf der
                corners[3],                  // window7 - inf izq
                { x: 0.5, y: 1 },            // window8 - CENTRO ABAJO (saldrá desde abajo, centrado)
                corners[2]                   // window9 - inf der
            ];            // window9 - inf der

const corner = customCorners[i];

            const finalDeform = [
          
            ][i] || {};
            const itemDelay = i * 250;
            animateItemFromCorner(item, final, corner, 1500, itemDelay, finalDeform);
        });

        // window5 animación especial
        const rect = container.getBoundingClientRect();
        window5.style.left = `${window5Final.x * rect.width}px`;
        window5.style.top = `${window5Final.y * rect.height}px`;
        window5.style.opacity = 1;
        window5.style.position = 'absolute';
        window5.style.zIndex = 20;
        window5.style.transform = 'translate(-50%, -50%) scale(0.5)';
        setTimeout(() => {
            window5.style.transform = 'translate(-50%, -50%) scale(1)';
            window5.style.zIndex = 10;
        }, 1800);
}

    // Responsive: solo aplica animación en desktop
    function applyGridEffect() {
        items.forEach(item => {
            item.style.opacity = '';
            item.style.left = '';
            item.style.top = '';
            item.style.transform = '';
            item.style.zIndex = '';
            item.style.position = 'static';
        });
        window5.style.left = '';
        window5.style.top = '';
        window5.style.transform = '';
        window5.style.zIndex = '';
        window5.style.position = 'static';
    }

    function handleResponsiveEffect() {
        if (window.innerWidth > 430) {
            animateAll();
        } else {
            applyGridEffect();
        }
    }

    handleResponsiveEffect();
    window.addEventListener('resize', handleResponsiveEffect);
});

// Animaciones CSS sugeridas
const style = document.createElement('style');
style.textContent = `
.window1 { animation: liquidPulse 12s cubic-bezier(.7,0,.3,1) infinite alternate; }
.window3 { animation: liquidPulseA 14s cubic-bezier(.7,0,.3,1) infinite alternate; }
.window6 { animation: liquidPulseB 16s cubic-bezier(.7,0,.3,1) infinite alternate; }
`;
document.head.append(style);
