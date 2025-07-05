
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig';
import { useMyStore } from './store/myStore';
function App() {
 
  let [title, setTitle] = useState('')

  const getData = async () => {
    let { data: t_sys_config, error } = await supabase
      .from('t_sys_config')
      .select('*')

      setTitle(t_sys_config[0].title)
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
     <h2>{title}</h2>
    </>
  )
}

export default App
