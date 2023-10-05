let fileinput = document.querySelector(".file-input")
let filteroption = document.querySelectorAll(".filter button")
let filtername = document.querySelector(".filter-info .name ")
let filtervalue = document.querySelector(".filter-info .value")
let filterslider = document.querySelector(".slider input")
let rotateoption = document.querySelectorAll(".rotate button")
let previewimg = document.querySelector(".imagepreview img")
let resetfilterbtn = document.querySelector(".reset")
let chooseimagebtn = document.querySelector(".chooseimage")
let saveimgbtn = document.querySelector(".saveimage")





let brightness = "100", saturation = "100", inversion = "0", grayscale = "0"
let rotate = 0, fliphorizontal = 1, flipvertical = 1

const loadimage = () => {
    let file = fileinput.files[0]
    if (!file) return;
    previewimg.src = URL.createObjectURL(file);
    previewimg.addEventListener("load", () => {
        resetfilterbtn.click();
        document.querySelector(".maincontainer").classList.remove("disable");

    })
}
const applyFilter = () => {
    previewimg.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal}, ${flipvertical})`;
    previewimg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
filteroption.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active")
        option.classList.add("active")
        filtername.innerText = option.innerText

        if (option.id === "brightness") {
            filterslider.max = "200";
            filterslider.value = brightness;
            filtervalue.innerText = `${brightness}%`;

        } else if (option.id === "saturation") {
            filterslider.max = "200";
            filterslider.value = saturation;
            filtervalue.innerText = `${saturation}%`
        } else if (option.id === "inversion") {
            filterslider.max = "100";
            filterslider.value = inversion;
            filtervalue.innerText = `${inversion}%`;
        } else {
            filterslider.max = "100";
            filterslider.value = grayscale;
            filtervalue.innerText = `${grayscale}%`;
        }

    })

})

const updatefilter = () => {
    filtervalue.innerText = `${filterslider.value}%`
    const selectedfilter = document.querySelector('.filter .active')

    if (selectedfilter.id === "brightness") {
        brightness = filterslider.value;
    } else if (selectedfilter.id === "saturation") {
        saturation = filterslider.value;
    } else if (selectedfilter.id === "inversion") {
        inversion = filterslider.value;
    } else {
        grayscale = filterslider.value;
    }
    applyFilter();

}

rotateoption.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            fliphorizontal = fliphorizontal === 1 ? -1 : 1;
        } else {
            flipvertical = flipvertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetfilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; fliphorizontal = 1; flipvertical = 1;
    filteroption[0].click();
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewimg.naturalWidth;
    canvas.height = previewimg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(fliphorizontal, flipvertical);
    ctx.drawImage(previewimg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}


filterslider.addEventListener("input", updatefilter);
resetfilterbtn.addEventListener("click", resetfilter);
saveimgbtn.addEventListener("click", saveImage);
fileinput.addEventListener("change", loadimage);
chooseimagebtn.addEventListener("click", () => fileinput.click());