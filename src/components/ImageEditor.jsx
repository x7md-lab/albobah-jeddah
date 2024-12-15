import { useEffect, useLayoutEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';

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
export default function ImageEditor(){
    const [imageURL, setImageURL] = useState();
    const [colors, setColors] = useState(defaultColors);
    useEffect(()=>{
        setImageURL(the_image(
            defaultColors
        ));
    }, []);

    return (
        <div className="grid gap-5 px-4 md:grid-cols-2 grid-cols-1">
				<div className="flex justify-center items-center">
					{imageURL && <img className="max-h-[300px]" src={imageURL}  />}
				</div>
            <div>
                <section className="bg-white rounded-md flex items-center p-2 h-full" dir="ltr">
                    <div className="h-full">
                    <h2 className="font-medium">Sun or Moon</h2>
                    <input type='color' onChange={e => setImageURL(
                        the_image({...colors, ...{sunMoon: e.target.value}})
                    )} defaultValue={colors.sunMoon} />
                    <h2 className="font-medium">Fountain</h2>
                    <input type='color' onChange={e => setImageURL(
                        the_image({...colors, ...{fountain: e.target.value}})
                    )} defaultValue={colors.fountain} />
                    <h2 className="font-medium">Sky</h2>
                    <input type='color' onChange={e => setImageURL(
                        the_image({...colors, ...{sky: e.target.value}})
                    )} defaultValue={colors.sky} />
                    <h2 className="font-medium">Sea</h2>
                    <input type='color' onChange={e => setImageURL(
                        the_image({...colors, ...{sea: e.target.value}})
                    )} defaultValue={colors.sea} />
                    <h2 className="font-medium">Sand</h2>
                    <input type='color' onChange={e => setImageURL(
                        the_image({...colors, ...{sand: e.target.value}})
                    )} defaultValue={colors.sand} />
                    </div>
                </section>
            </div>
        </div>
    )
}

