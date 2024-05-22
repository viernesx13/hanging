let words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'PAPAYA',
    'VEHICULO',
    'VETERINARIO',
    'CELULAR',
    'TELEFONO'
];

export function getRandomWord (){

    //console.log( Math.floor(Math.random() * words.length));
    const randomIndex = Math.floor(Math.random() * words.length);

    return words [randomIndex];
    
}
