/** 
 * @author Hugo Espinosa Martínez
 * @description Formulario de subastas
 * @version 1.0.0
**/
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import services from "@/services"
import toast, { Toaster } from 'react-hot-toast';

export function SubastaForm({ nombreMaxPuja, maxPuja, setMaxPuja }) {

  const refreshData = async () => {
    try {
      // Update the state or do something with the response data
      const response = await services.getMaxPuja('http://localhost:3000/api/subasta/maxPuja/1');
      setMaxPuja(response);
    } catch (error) {
      console.error(error);
    }
  }

  const notify = () => toast.success('El ganador de la subasta es: ' + nombreMaxPuja + ' con una puja de $' + maxPuja );

  const savePuja = async (event) => {

    event.preventDefault();
    const name = document.getElementById('name').value;
    const bid = document.getElementById('bid').value;
    const request = {
      "name": name,
      "puja": bid,
      "session": 1
    }

    try {
      const response = await services.addPuja('http://localhost:3000/api/subasta/', request);
      alert(response.message);
      refreshData();
    } catch (error) {
      console.error(error);
    }
    document.getElementById('name').value = '';
    document.getElementById('bid').value = '';

  }



  return (
    (<div className="container mx-auto max-w-2xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subasta</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Máxima puja actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">$ {maxPuja}</div>
              <div className="text-muted-foreground">Efectuado por {nombreMaxPuja}</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingresa tu puja</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bid">Puja</Label>
                  <Input id="bid" type="number" placeholder="$1,500" />
                </div>
              </div>

              <div className="space-y-2">
                
                <Button
                  type="button"
                  variant="secondary"
                  className="w-1/2"
                  onClick={notify}
                >
                  Terminar subasta
                </Button>
                <Button
                  type="submit"
                  className="w-1/2"
                  onClick={savePuja}
                >
                  Insertar
                </Button>
                <Toaster />
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}
