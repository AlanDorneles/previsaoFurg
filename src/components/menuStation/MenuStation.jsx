import styles from './MenuStation.module.css'
export const MenuStation = () =>{
    return (
        <>
            <div className={styles.container}>
                <div className={styles.containerSelect}>
                    <p>Parâmetro</p>
                    <div className="select is-primary">
                        <select>
                            <option value={'pressure'}>Pressão</option>
                            <option value={'rain'}>Precipitação Total (mm)</option>
                            <option value={2}>Temperatura Mínima (ºC)</option>
                            <option value={3}>Temperatura Máxima (ºC)</option>
                            <option value={4}>Umidade (%)</option>
                            <option value={5}>Direção do Vento (º)</option>
                            <option value={6}>Velocidade do vento (m/s)</option>
                            <option value={7}>Rajada de vento (m/s)</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}