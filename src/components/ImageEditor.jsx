import { useEffect, useCallback, useState, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { Button } from './ui/button';

const SvgIcon = ({sunMoon, fountain, sky, sea, sand}) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 1080 1080"
    >
      <path d="M-.5-.5v1080h1080V-.5z" 
      fill={sky}
      ></path>
      <path
        d="M-.5-.5V667H412V509.4c0-140.8 114.1-254.9 254.9-254.9V667h412.5V-.5zm333.9 333.8c-43.5 0-78.8-35.3-78.8-78.8s35.3-78.8 78.8-78.8 78.8 35.3 78.8 78.8-35.3 78.8-78.8 78.8"
        fill={sky}
      ></path>
      <path
        d="M667 254.5c-140.8 0-254.9 114.1-254.9 254.9V667H667z"
        fill={fountain}
      ></path>
      <circle
        cx="333.4"
        cy="254.5"
        r="78.8"
        fill={sunMoon}
        transform="rotate(-9.2 334.107 255.176)"
      ></circle>
      <path d="M412.1 667H-.5v254.9h1080V667H412.1" 
      fill={sea}
      ></path>
      <path d="M-.5 921.9h1080v157.6H-.5z" 
      fill={sand}
      ></path>
    </svg>
  );

  const the_image = (colors)=> {
        const html = renderToString(
        <SvgIcon {
           ...colors
        } />
        );
        const a_blob = new Blob([html], { type: "image/svg+xml" });
        const url = URL.createObjectURL(a_blob); 
        //console.log(url);
        return url;
  }
const defaultColors = {
    sky: '#a5e4e3', 
    fountain: '#e7f7f7', 
    sunMoon: '#ffba40',
    sea: '#4acdca',
    sand: '#eebf91'
}


function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomColors() {
    return {
        sky: getRandomHexColor(),
        fountain: getRandomHexColor(),
        sunMoon: getRandomHexColor(),
        sea: getRandomHexColor(),
        sand: getRandomHexColor(),
    };
}

export default function ImageEditor(){
    const [imageURL, setImageURL] = useState();
    const [colors, setColors] = useState(defaultColors);
    const imageRef = useRef(null);

    const handleClick = useCallback(() => {
        setColors(prevColors => {
            const newColors = generateRandomColors();
            const updatedColors = { ...prevColors, ...newColors }; // Merge with previous
            setImageURL(the_image(updatedColors));
            return updatedColors;
        });
    }, [the_image]);

    useEffect(()=>{
        setImageURL(the_image(
            defaultColors
        ));
    }, []);

    async function downloadImage(){
        const svg = await (await fetch(imageRef.current.src)).text();
        console.log(svg)
        const resvgJS = new resvg.Resvg(svg)
        const pngData = resvgJS.render(svg) // Output PNG data, Uint8Array
        const pngBuffer = pngData.asPng()
        const file = new File([pngBuffer], "Jeddah by albobah.png", {
            type: "image/png",
        });
        // const svgURL = URL.createObjectURL(new Blob([pngBuffer], { type: 'application/octet-stream' }))
        const svgURL = URL.createObjectURL(file)
        // console.info('Output PNG Size  :', `${pngData.width} x ${pngData.height}`)
        const download = document.createElement('a');
        download.setAttribute("download", "Jeddah by albobah.png");
        download.href = svgURL;
        download.click();
    }

    return (
        <div className="grid gap-5 px-4 md:grid-cols-2 grid-cols-1">
				<div className="flex flex-col justify-center items-center">
					{imageURL && <img className="max-h-[265px]" ref={imageRef} src={imageURL}  />}
				</div>
            <div>
                <section className="bg-white rounded-md flex flex-col justify-center p-2 h-full" dir="ltr">
                    <div className='flex items-center justify-between py-2'>
                        <h2 className="font-black text-2xl">
                            Colors
                        </h2>
                        <Button className='p-1 bg-transparent text-black hover:bg-gray-200 border'
                        onClick={
                            handleClick
                        }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className='!size-6' viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22m4.262-14.523a.75.75 0 0 1 1.06-.015l1.2 1.167a.75.75 0 0 1 0 1.075l-1.2 1.167a.75.75 0 0 1-1.146-.954h-.338c-.511 0-.844 0-1.1.025c-.242.023-.36.062-.444.109c-.084.046-.176.12-.318.307c-.152.2-.323.474-.586.902l-1.52 2.463c-.242.39-.45.729-.652.994c-.218.286-.46.532-.789.713c-.328.18-.666.254-1.025.288c-.336.032-.74.032-1.21.032H6a.75.75 0 0 1 0-1.5h2.162c.511 0 .844 0 1.1-.025c.243-.023.36-.062.444-.11c.084-.045.176-.12.318-.306c.152-.2.323-.475.586-.902l1.52-2.464c.242-.39.45-.728.652-.994c.218-.285.46-.531.789-.712c.328-.18.666-.255 1.025-.289c.336-.031.74-.031 1.21-.031h.37a.75.75 0 0 1 .086-.94M9.385 9.77c-.085-.017-.185-.02-.584-.02H6a.75.75 0 0 1 0-1.5h2.858c.313 0 .565 0 .806.045a2.56 2.56 0 0 1 1.405.775c.167.18.299.394.459.653l.03.05a.75.75 0 1 1-1.276.788c-.206-.334-.259-.413-.313-.472a1.06 1.06 0 0 0-.584-.32m3.301 3.26a.75.75 0 0 1 1.032.244c.206.333.259.412.313.471c.151.163.355.277.584.32c.085.016.186.02.584.02h.977a.75.75 0 0 1 1.147-.955l1.2 1.167a.75.75 0 0 1 0 1.075l-1.2 1.167a.75.75 0 0 1-1.147-.955h-1.034c-.313 0-.565 0-.806-.045a2.56 2.56 0 0 1-1.405-.775c-.167-.18-.299-.394-.459-.653l-.03-.05a.75.75 0 0 1 .244-1.032" clipRule="evenodd"></path>
                            </svg>
                            <span className=''>
                                Randomize
                            </span>
                        </Button>
                    </div>
                    <div>
                    <h2 className="font-medium">Sun or Moon</h2>
                    <input type='color' onChange={e => {
                        setImageURL(
                            the_image({...colors, ...{sunMoon: e.target.value}})
                        )
                        setColors({...colors, ...{sunMoon: e.target.value}});
                    }} defaultValue={colors.sunMoon} />
                    <h2 className="font-medium">Fountain</h2>
                    <input type='color' onChange={e => {
                        setImageURL(
                        the_image({...colors, ...{fountain: e.target.value}})
                        )
                        setColors({...colors, ...{fountain: e.target.value}})
                    }} defaultValue={colors.fountain} />
                    <h2 className="font-medium">Sky</h2>
                    <input type='color' onChange={e => {
                        setImageURL(
                        the_image({...colors, ...{sky: e.target.value}})
                        )
                        setColors({...colors, ...{sky: e.target.value}})
                    }} defaultValue={colors.sky} />
                    <h2 className="font-medium">Sea</h2>
                    <input type='color' onChange={e => {
                        setImageURL(
                        the_image({...colors, ...{sea: e.target.value}})
                        )
                        setColors({...colors, ...{sea: e.target.value}})
                    }} defaultValue={colors.sea} />
                    <h2 className="font-medium">Sand</h2>
                    <input type='color' onChange={e => {
                        setImageURL(
                        the_image({...colors, ...{sand: e.target.value}})
                        )
                        setColors({...colors, ...{sand: e.target.value}})
                    }} defaultValue={colors.sand} />
                    </div>
                    <div className='mt-4'>
                        <div className='grid grid-cols-2 gap-5 bg-white'>
                            <Button
                            onClick={()=> downloadImage()}
                            className='p-1 bg-transparent text-black hover:bg-gray-200 border'>
                                Download
                            </Button>
                            <Button disabled className='p-1 bg-transparent text-black hover:bg-gray-200 border'>
                                Share
                            </Button>
                        </div>
                    </div>
                </section>
                
            </div>
        </div>
    )
}

