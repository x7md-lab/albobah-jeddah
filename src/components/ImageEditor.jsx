export default function ImageEditor(){

    return (
        <div className="grid gap-5 px-4 md:grid-cols-2 grid-cols-1">
				<div className="flex justify-center items-center">
					<img className="max-h-[300px]" src="Jeddah by albobah.svg" />
				</div>
            <div>
                <section className="bg-white rounded-md flex items-center p-2 h-full" dir="ltr">
                    <div className="h-full">
                    <h2 className="font-medium">Sun or Moon</h2>
                    <h2 className="font-medium">Fountain</h2>
                    <h2 className="font-medium">Sky</h2>
                    <h2 className="font-medium">Sea</h2>
                    <h2 className="font-medium">Sand</h2>
                    </div>
                </section>
            </div>
        </div>
    )
}