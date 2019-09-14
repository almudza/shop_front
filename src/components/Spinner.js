import React from 'react'
import styles from './Spinner.module.css'

export const spinner = () => (
    <div className="text-center">
        <div className={styles.loading}></div>
    </div>
)
