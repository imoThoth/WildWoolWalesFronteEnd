export default function Hero(){
    return(
        <section className="px-8 py-20 max-w-6xl mx-auto">
            <p
                className="text-xs uppercase tracking-[0.4em] mb-8"
                style={{ color: '#7A6F5C', fontFamily: '"Newsreader", serif' }}
            >
            — Spring Collection / Number Seven
            </p>
                <h1
                    className="leading-[0.95] mb-8"
                    style={{
                    fontFamily: '"Fraunces", serif',
                    fontWeight: 300,
                    fontVariationSettings: '"opsz" 144, "SOFT" 100',
                    color: '#1C1915',
                    fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                    letterSpacing: '-0.03em',
                    }}
                >
                    Knitted by hand,
                    <br />
                    <em style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100', fontStyle: 'italic' }}>
                    one stitch
                    </em>{' '}
                    at a time.
                </h1>
            <p
                className="max-w-xl text-lg leading-relaxed"
                style={{ color: '#3A352B', fontFamily: '"Newsreader", serif' }}
            >
                Every piece in this shop was made by Andi Elston, on needles
                they have used for years, in a house with the kettle on. Some take an
                afternoon. The [homemade gloves takes, change to actual product] two weeks.
            </p>
    </section>

    )
}