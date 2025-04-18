'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '../auth.module.css'
import Link from 'next/link'

const Page = () => {
  const router = useRouter()

  async function gohome() {
    await router.push('/')
  }

  async function gologin() {
    await router.push('/auth/login')
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.header}>Sign up</h1>

      <label className={styles.inputTitle}>Email</label>
      <input type="email" placeholder="Enter your email" className={styles.input} />

      <label className={styles.inputTitle}>Password</label>
      <input type="password" placeholder="Enter your password" className={styles.input} />

      <p className={styles.userAgreementText}>
        By signing in, you automatically agree to our{' '}
        <Link
          href="/legal/terms-of-use"
          rel="noopener noreferrer"
          target="_blank"
          className={styles.userAgreementSpan}
        >
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link
          href="/legal/privacy-policy"
          rel="noopener noreferrer"
          target="_blank"
          className={styles.userAgreementSpan}
        >
          Privacy Policy
        </Link>
        .
      </p>

      <button className={styles.mainButton}>Signup</button>
      <button className={styles.mainButton} onClick={gologin}>Go Login</button>
      <button className={styles.mainButton} onClick={gohome}>Go Back</button>
    </section>
  )
}

export default Page
