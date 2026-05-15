export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  icon: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: 'foundations',
    number: 1,
    title: 'Foundations of AI',
    subtitle: 'Understanding the landscape of artificial intelligence',
    level: 'Beginner',
    color: '#0D7377',
    icon: '🧠',
    lessons: [
      {
        id: 'ai-history',
        title: 'What is AI? A Brief History',
        duration: '12 min',
        content: `## What is Artificial Intelligence?

Artificial Intelligence is the science of creating machines that can perform tasks that normally require human intelligence: reasoning, learning, problem-solving, perception, and language understanding.

### A Timeline of AI

**1950: The Turing Test**
Alan Turing asked: *"Can machines think?"* He proposed a test: if a machine's conversation is indistinguishable from a human's, it passes. We're now well past that threshold.

**1956: The Birth of "AI"**
At Dartmouth College, John McCarthy coined the term "Artificial Intelligence." Researchers believed human-level AI was decades away. They weren't entirely wrong.

**1980s: The Expert Systems Era**
Rule-based systems like MYCIN could diagnose bacterial infections. But they were brittle: they only knew what humans explicitly programmed in.

**1997: Deep Blue Beats Kasparov**
IBM's chess computer defeated the world champion. Symbolic AI at its peak, but still narrow and rule-bound.

**2012: The Deep Learning Revolution**
AlexNet crushed the ImageNet competition using GPUs and deep neural networks. The modern era of AI begins.

**2017: Transformers Change Everything**
Google's "Attention Is All You Need" paper introduced the Transformer architecture. This became the engine behind every major language model today.

**2022: ChatGPT Goes Viral**
OpenAI's ChatGPT reached 100 million users in 2 months: the fastest-growing app in history. The world woke up to Generative AI.

**2024–2026: The Agentic Era**
Models like GPT-4o, Claude 4, and Gemini Ultra are no longer just chatbots: they're agents that browse the web, write code, and orchestrate complex workflows autonomously.

---

### The Three Waves of AI

| Wave | Era | Approach | Limitation |
|------|-----|----------|-----------|
| Symbolic AI | 1956–1980s | Rules & logic | Brittle, can't generalize |
| Machine Learning | 1990s–2010s | Statistical patterns | Needs feature engineering |
| Deep Learning / GenAI | 2012–present | Neural networks on massive data | Needs huge compute & data |`
      },
      {
        id: 'ml-vs-dl-vs-genai',
        title: 'ML vs Deep Learning vs GenAI',
        duration: '10 min',
        content: `## The Family Tree of AI

Think of it as nesting dolls:
**AI ⊃ Machine Learning ⊃ Deep Learning ⊃ Generative AI**

Each inner layer is a *specialisation* of the outer one.

---

### Machine Learning
**Definition:** Systems that learn patterns from data without being explicitly programmed.

**Analogy:** Teaching a dog with treats. You show it examples (data), reward correct behavior (loss function), and it generalises.

**Examples:** Spam filters, house price prediction, credit scoring.

**How it works:** Feed in labeled data → algorithm finds mathematical patterns → model makes predictions on new data.

---

### Deep Learning
**Definition:** Machine learning using *deep neural networks*: many stacked layers of artificial neurons.

**Analogy:** Like a city's road network. Traffic (data) flows in, passes through intersections (neurons), and the pattern of flow determines the output.

**Why "deep"?** The *depth* (number of layers) allows the model to learn hierarchical features: pixels → edges → shapes → faces.

**Examples:** Image recognition, speech-to-text, translation.

---

### Generative AI
**Definition:** AI that can *create* new content (text, images, code, audio, video) that resembles its training data.

**Analogy:** A musician who has listened to 10,000 songs can now compose original music in any style. They're not copying: they've internalised the patterns.

**Examples:** ChatGPT, DALL-E, Midjourney, GitHub Copilot, Claude.

---

### Comparison Table

| Feature | Traditional ML | Deep Learning | Generative AI |
|---------|---------------|---------------|---------------|
| Output | Prediction/classification | Classification/features | New content |
| Data needed | Moderate | Large | Massive |
| Interpretability | High | Low | Very Low |
| Compute | Low | High | Very High |
| Key use cases | Analytics, forecasting | Vision, speech | Text, images, code |`
      },
      {
        id: 'neural-networks',
        title: 'Neural Networks: The City Road Analogy',
        duration: '15 min',
        content: `## How Neural Networks Work

### The Biological Inspiration
The human brain has ~86 billion neurons. Each neuron connects to thousands of others. When you see a cat, billions of neurons fire in specific patterns. AI neural networks mimic this: loosely.

---

### The City Road Network Analogy

Imagine a city where:
- **Input layer** = City gates (where data enters: pixels, words, numbers)
- **Hidden layers** = The network of roads and intersections
- **Output layer** = The city's destination (your answer: "cat", "spam", "buy")
- **Weights** = Road width (how much "traffic"/importance flows through each connection)
- **Activation function** = Traffic lights (decides if a signal is strong enough to pass through)

When you train the network, you're essentially **rebuilding the road network** until the right traffic reaches the right destination for every example.

---

### Training: How a Network Learns

1. **Forward pass:** Data flows through the network → produces an output
2. **Loss calculation:** How wrong was that output? (e.g., predicted "dog", real answer was "cat")
3. **Backpropagation:** The error signal flows *backwards*: which roads (weights) caused the wrong turn?
4. **Gradient descent:** Slightly adjust each road to reduce the error
5. **Repeat** millions of times on millions of examples

---

### Training vs Inference

| | Training | Inference |
|--|----------|-----------|
| What happens | Network learns from data | Network applies what it learned |
| Compute | Massive (weeks/months) | Fast (milliseconds) |
| When | Done once (or periodically) | Done every time you use the model |
| Cost | Very expensive ($millions) | Much cheaper |

**Analogy:** Training is a student studying for years. Inference is the student answering a single exam question in 2 seconds.

---

### Key Players in 2026

| Company | Key Models | Specialty |
|---------|-----------|-----------|
| **OpenAI** | GPT-4o, o3 | Broad capability, reasoning |
| **Anthropic** | Claude 4 Opus/Sonnet | Safety, long context, coding |
| **Google DeepMind** | Gemini 2.0 Ultra | Multimodal, search integration |
| **Meta AI** | Llama 3.3, Llama 4 | Open-source, research |
| **Mistral AI** | Mistral Large, Codestral | European, efficient models |`
      }
    ]
  },
  {
    id: 'genai-llms',
    number: 2,
    title: 'Generative AI & LLMs',
    subtitle: 'How language models think, speak, and create',
    level: 'Beginner',
    color: '#C4622D',
    icon: '✨',
    lessons: [
      {
        id: 'what-is-generative',
        title: 'What Makes a Model "Generative"?',
        duration: '8 min',
        content: `## Discriminative vs Generative Models

Most classical ML models are **discriminative**: they draw boundaries between categories.
- *"Is this email spam or not spam?"*
- *"Does this X-ray show cancer?"*

**Generative models** do something fundamentally different: they model the *entire distribution* of data so they can sample from it.

---

### The Photography Analogy

- **Discriminative model** = A museum curator who can tell you "this is a Monet" or "this is a Picasso": they classify.
- **Generative model** = A master painter who has studied every painting ever made and can now paint entirely new works in any style.

The generative model doesn't just recognise patterns. It has internalised them deeply enough to *reproduce and extend* them.

---

### How LLMs Generate Text

Large Language Models (LLMs) are trained to predict the next token (roughly, word-piece) given all previous tokens.

**Training objective:** Given "The Eiffel Tower is in", predict "Paris".

After training on trillions of words, the model develops a rich internal model of:
- Grammar and style
- World knowledge
- Reasoning patterns
- Conversational norms

At inference time, it samples from this learned distribution token by token: which is why the same prompt can give slightly different responses each time.

---

### Tokens: The Puzzle Pieces of Language

Text isn't fed as whole words: it's broken into **tokens**: sub-word pieces.

- "unbelievable" → ["un", "believ", "able"]: 3 tokens
- "ChatGPT" → ["Chat", "G", "PT"]: 3 tokens
- "Hello" → ["Hello"]: 1 token

**Why does this matter?**
- Most models charge per token
- Context windows are measured in tokens (~4 characters per token on average)
- Tokenization affects how models handle rare words, numbers, and code`
      },
      {
        id: 'transformers',
        title: 'Transformers & Self-Attention: The Detective Analogy',
        duration: '18 min',
        content: `## The Transformer Architecture

The 2017 paper "Attention Is All You Need" introduced Transformers: now the backbone of every major language model.

---

### The Detective Reading a Sentence

Imagine a detective reading: *"The bank by the river flooded because it rained too much."*

To understand "it" refers to "river bank" (not a financial bank), the detective must:
1. Read the whole sentence first
2. Pay special **attention** to "river" and "bank" while processing "it"
3. Weight the importance of each word relative to every other word

This is exactly what **Self-Attention** does: every token looks at every other token and decides how much attention to pay to each one.

---

### How Self-Attention Works (Simply)

For each word/token, the model creates three vectors:
- **Query (Q)** = "What am I looking for?"
- **Key (K)** = "What do I contain?"
- **Value (V)** = "What information can I contribute?"

The attention score between two tokens = Q · K (dot product)
The output = weighted sum of all Values, weighted by attention scores.

**Result:** Every token gets context from every other token simultaneously.

---

### Why Transformers Beat Previous Architectures

| Feature | Old RNNs/LSTMs | Transformers |
|---------|---------------|-------------|
| Processes sequence | One word at a time | All words in parallel |
| Long-range dependencies | Struggles (forgetting) | Handles easily (attention) |
| Training speed | Slow (sequential) | Fast (parallelisable) |
| Scalability | Limited | Scales with compute |

---

### Key Concepts

**Multi-Head Attention:** Run self-attention multiple times in parallel, each "head" learning different relationships (syntax, semantics, coreference).

**Positional Encoding:** Since Transformers process all tokens at once, position information is injected mathematically.

**Feed-Forward Layers:** After attention, each token passes through a neural network to process the gathered context.

**Layer Norm + Residual Connections:** Stabilise training and allow very deep networks.

---

### Prompt Engineering

The art of crafting inputs that reliably elicit the outputs you want.

| Technique | What it is | Example |
|-----------|-----------|---------|
| **Zero-shot** | No examples, just instructions | "Translate to Dutch:" |
| **Few-shot** | 2–5 examples before the task | Show 3 Q&A pairs, then ask |
| **Chain-of-thought** | Ask the model to reason step by step | "Think step by step..." |
| **System prompt** | Set the model's persona/context | "You are an expert data engineer..." |
| **Role prompting** | Assign a role | "Act as a senior ML engineer..." |

---

### Temperature, Top-P & Context Window

**Temperature (0–2):**
Controls randomness. Think of it like a thermostat for creativity.
- 0 = Deterministic (same answer every time, factual)
- 1 = Balanced (default)
- 2 = Wild/Creative (risky hallucinations)

**Top-P (0–1):**
Nucleus sampling: only consider tokens that together account for top P% of probability. At 0.9, cuts off tail-end unlikely tokens.

**Context Window:**
The maximum number of tokens the model can "see" at once. Like the model's working memory.
- GPT-4 Turbo: 128K tokens (~100,000 words)
- Claude 3.5 Sonnet: 200K tokens
- Gemini 1.5 Pro: 2M tokens

**Fine-tuning vs Prompting:**
- **Prompting:** No training, instant, cheap: best for most use cases
- **Fine-tuning:** Retrain on your data, better for specific domains/styles: expensive but powerful`
      },
      {
        id: 'famous-models',
        title: 'The Model Landscape in 2026',
        duration: '10 min',
        content: `## Major Language Models: A Field Guide

### Proprietary Models

**GPT-4o (OpenAI)**
- Natively multimodal (text, image, audio, video)
- 128K context window
- Best general-purpose model for most tasks
- Powers ChatGPT, many enterprise apps

**Claude 4 Opus / Sonnet / Haiku (Anthropic)**
- Built with "Constitutional AI" for safety
- Exceptional at long documents (200K context)
- Best-in-class for coding and reasoning
- Haiku = fastest/cheapest, Opus = most capable

**Gemini 2.0 Ultra (Google DeepMind)**
- Deep integration with Google Search
- 2M token context window
- Strong at multimodal tasks
- Powers Google Workspace AI features

---

### Open-Source Models

**Llama 3.3 / Llama 4 (Meta)**
- Free to use and modify
- Can run locally on consumer hardware (smaller variants)
- Powers thousands of specialised fine-tunes
- Community ecosystem: Ollama, LM Studio

**Mistral Large / Mixtral (Mistral AI)**
- European company (Paris-based)
- Very efficient: strong performance per compute
- Mixture of Experts (MoE) architecture
- Popular in EU due to data sovereignty

**Qwen, DeepSeek (Asian Labs)**
- Highly competitive on benchmarks
- Strong multilingual capabilities
- Often surpass much larger models in efficiency

---

### How to Choose a Model

| Need | Recommended |
|------|------------|
| Best reasoning/coding | Claude 4 Opus or GPT-4o |
| Fastest & cheapest | Claude Haiku / GPT-3.5 |
| Privacy / on-premise | Llama 3 / Mistral |
| Long documents | Claude 3.5 Sonnet (200K) |
| Search-augmented | Gemini with Google tools |
| European data laws | Mistral (hosted in EU) |`
      }
    ]
  },
  {
    id: 'embeddings-vectors',
    number: 3,
    title: 'Embeddings & Vector Databases',
    subtitle: 'Teaching machines to understand meaning, not just words',
    level: 'Intermediate',
    color: '#6B3FA0',
    icon: '🌌',
    lessons: [
      {
        id: 'what-are-embeddings',
        title: 'What is an Embedding? A Galaxy of Meaning',
        duration: '15 min',
        content: `## Embeddings: Coordinates in a Galaxy of Meaning

### The Core Idea

An **embedding** converts any object (word, sentence, image, video) into a list of numbers: a **vector**: that captures its *meaning*.

**Example:**
- "king" → [0.82, -0.31, 0.55, 0.14, ...]  (384 or 1536 numbers)
- "queen" → [0.79, -0.28, 0.52, 0.18, ...]
- "banana" → [-0.41, 0.63, -0.22, 0.87, ...]

Notice: "king" and "queen" have similar numbers. "Banana" looks completely different. That's the magic: **the numbers encode semantic meaning**.

---

### The Galaxy Analogy

Imagine every word, sentence, or document is a *star* in a galaxy. Similar meanings cluster together in the same neighbourhood:
- "happy", "joyful", "elated" → all in the same region
- "Paris", "London", "Berlin" → another cluster (European capitals)
- "Python", "JavaScript", "Rust" → programming languages cluster

When you embed a query like *"How do I get to France's capital?"*, it lands near "Paris" in this galaxy: even if you never used the word "Paris".

This is the foundation of **semantic search**: finding meaning, not just matching keywords.

---

### The Library Card Catalog: But for Meaning

Old library card catalogs used keywords: search "cat" → get books with the word "cat".

Modern semantic search uses embeddings:
- Search *"feline pet care"* → finds books about cats, kittens, cat food
- Even if the word "cat" never appears

The embedding captures *what you mean*, not just *what you said*.

---

### Word2Vec's Famous Equation

**king − man + woman ≈ queen**

This is a real result from the Word2Vec embedding model (2013). It showed that vector arithmetic on embeddings captures semantic relationships:
- Capital relationships: Paris − France + Germany ≈ Berlin
- Tense: running − run + walk ≈ walking

---

### Cosine Similarity: How We Measure Closeness

To compare two embeddings, we measure the **cosine of the angle** between their vectors.

- **Cosine similarity = 1.0** → Identical meaning (angle = 0°)
- **Cosine similarity ≈ 0.9** → Very similar
- **Cosine similarity ≈ 0.0** → Unrelated (perpendicular)
- **Cosine similarity = -1.0** → Opposite meaning

**Why cosine and not Euclidean distance?**
Cosine is direction-based, not magnitude-based. "The cat sat" and "The cat sat on the mat" might have different vector lengths but point in the same direction: and they mean similar things.`
      },
      {
        id: 'vector-databases',
        title: 'Vector Databases: The New Data Primitive',
        duration: '20 min',
        content: `## Vector Databases

Traditional databases answer: *"Find me rows where name = 'Alice'"*: exact match.

Vector databases answer: *"Find me the 10 most semantically similar documents to this query"*: approximate nearest neighbour (ANN) search.

---

### How Vector Databases Work

1. **Store:** You embed your documents/data → store vectors alongside metadata
2. **Index:** Build a specialised index (HNSW, IVF) for fast approximate search
3. **Query:** Embed your question → find K nearest vectors in milliseconds

**HNSW (Hierarchical Navigable Small World)**
The most popular index algorithm. Like a highway system: instead of checking every city, you navigate a hierarchy of connections to find nearby cities fast. Searches millions of vectors in milliseconds.

---

### The Main Vector Databases

| Database | Type | Best For | Note |
|----------|------|----------|------|
| **Pinecone** | Managed cloud | Production, enterprise | Fully managed SaaS |
| **Weaviate** | Open-source / Cloud | GraphQL API, multimodal | Dutch company! 🇳🇱 |
| **Chroma** | Open-source | Local dev, prototyping | Easiest to start with |
| **Qdrant** | Open-source / Cloud | High performance, filtering | Rust-based, fast |
| **pgvector** | PostgreSQL extension | Existing Postgres users | Add vectors to SQL DB |
| **Milvus** | Open-source | Large-scale, enterprise | Billions of vectors |
| **Redis** | Cache + vector | Low latency, small datasets | Already in your stack? |

---

### Weaviate: Made in the Netherlands 🇳🇱

Weaviate was founded in Amsterdam in 2019. It's one of the most popular open-source vector databases and has raised $67M+. If you're job hunting in the Netherlands, knowing Weaviate is a genuine differentiator.

---

### Key Concepts

**Metadata filtering:** Combine vector search with traditional filters.
*"Find the 10 most similar documents to my query, but only from documents written after 2024 in English."*

**Namespaces/Collections:** Organise vectors into logical groups (like tables in SQL).

**Upsert:** Insert or update a vector. Common pattern since embeddings are deterministic.

**Dimensions:** The length of your embedding vector. OpenAI ada-002 = 1536 dims. Sentence-BERT = 384 dims. More dimensions = more expressive but more storage.

---

### Use Cases

- **Semantic search**: search support docs by meaning
- **RAG**: retrieve relevant context for LLM answers
- **Recommendations**: "users who liked this also liked..."
- **Deduplication**: find near-duplicate content
- **Anomaly detection**: embeddings far from any cluster are outliers
- **Image/video search**: embed visual content, search by concept`
      }
    ]
  },
  {
    id: 'rag',
    number: 4,
    title: 'RAG: Retrieval Augmented Generation',
    subtitle: 'Giving LLMs access to your private knowledge',
    level: 'Intermediate',
    color: '#D4A017',
    icon: '🔍',
    lessons: [
      {
        id: 'why-rag',
        title: 'The Problem RAG Solves',
        duration: '10 min',
        content: `## Why RAG Exists

### Two Critical Problems with Plain LLMs

**Problem 1: Knowledge Cutoff**
Every LLM is trained on data up to a certain date. GPT-4's training cut off in 2024. It knows nothing about events after that. Ask it about yesterday's news: it's blind.

**Problem 2: Hallucination**
LLMs are pattern-completion machines. When they don't know the answer, they often *make one up* with full confidence. This is called hallucination: and it's dangerous in production.

---

### The RAG Solution

**Retrieval Augmented Generation** = Give the LLM access to a relevant, up-to-date knowledge base at query time.

Instead of asking: *"What does our refund policy say?"*
You:
1. Search your policy documents for relevant chunks
2. Inject those chunks into the LLM's context
3. Ask the LLM to answer *based on the retrieved content*

**Result:** Grounded answers, not hallucinated ones. And always up-to-date.

---

### The Doctor's Reference Book Analogy

A doctor without books relies on memory (can misremember). A doctor with access to UpToDate medical references at the bedside looks up the latest guidelines before answering. They're still the expert who synthesises the answer: but they're grounded in current, accurate sources.

RAG = giving your LLM the reference books.

---

### When to Use RAG vs Fine-tuning

| Scenario | Use RAG | Use Fine-tuning |
|----------|---------|----------------|
| Private company knowledge | ✅ | ❌ Too slow to update |
| Rapidly changing info | ✅ | ❌ Stale quickly |
| Specific writing style | ❌ | ✅ |
| Domain terminology | Partially | ✅ Better |
| Transparency/citations | ✅ | ❌ |
| Cost | Lower | Higher upfront |`
      },
      {
        id: 'rag-architecture',
        title: 'RAG Architecture: Index, Retrieve, Generate',
        duration: '25 min',
        content: `## RAG Architecture Deep Dive

A RAG system has two phases: **Indexing** (offline) and **Retrieval + Generation** (online, at query time).

---

### Phase 1: Indexing (Offline)

**Step 1: Load Documents**
Ingest your data sources: PDFs, Word docs, web pages, databases, APIs.
Tools: LangChain document loaders, LlamaIndex readers, Unstructured.io.

**Step 2: Chunk Documents**
Split documents into smaller pieces. LLMs have context limits, so you can't feed an entire book in.

**Chunking Strategies:**
- **Fixed-size:** Split every 512 tokens. Simple, but may cut mid-sentence.
- **Sentence/paragraph:** Split at natural boundaries. Cleaner but variable size.
- **Semantic chunking:** Group semantically related sentences. Best quality, more complex.
- **Hierarchical:** Create parent chunks + child chunks. Parent for context, child for precision.
- **Overlap:** Add 10–20% overlap between chunks to avoid losing context at boundaries.

**Step 3: Embed Chunks**
Run each chunk through an embedding model (e.g., OpenAI text-embedding-3-large, Cohere embed-v3) → get a vector for each chunk.

**Step 4: Store in Vector DB**
Store vector + original text + metadata (source, date, page number) in your vector database.

---

### Phase 2: Retrieval + Generation (Online)

**Step 1: Embed the Query**
User asks a question → embed it with the same model used for indexing.

**Step 2: Vector Search**
Query the vector database for the K most similar chunks (typically K=5–10).

**Step 3: Reranking (Optional but recommended)**
A cross-encoder reranker (e.g., Cohere Rerank, BGE Reranker) re-scores the retrieved chunks more accurately. More compute than vector search, but applied to just K candidates.

**Step 4: Prompt Construction**
Assemble: System prompt + Retrieved chunks + User question.

**Step 5: LLM Generation**
The LLM reads the assembled context and generates a grounded answer.

---

### Hybrid Search: BM25 + Vector

Pure vector search misses exact keyword matches. Pure BM25 (keyword search) misses semantic meaning.

**Hybrid search = BM25 + vector search with score fusion.**

Example: Query "GDPR article 17 right to erasure"
- Vector search finds semantically related documents about data deletion
- BM25 finds documents with exact match "article 17"
- Both results are merged and scored

**Reciprocal Rank Fusion (RRF)** is the most common fusion method: combine ranks from both systems.

---

### Advanced RAG Techniques

**HyDE (Hypothetical Document Embeddings)**
Instead of embedding the raw question, ask the LLM to generate a hypothetical answer, then embed *that*. The hypothetical answer is closer in embedding space to real documents than the sparse question.

**Self-RAG**
The model learns when to retrieve (not always necessary) and critiques its own outputs. Tags: [Retrieve], [ISREL], [ISSUP], [ISUSE].

**Corrective RAG (CRAG)**
Evaluates retrieval quality. If retrieved docs are irrelevant, falls back to web search. Adds a correction step before generation.

---

### RAG Evaluation: The Triad

| Metric | Question It Answers | Tool |
|--------|---------------------|------|
| **Faithfulness** | Is the answer supported by retrieved context? | RAGAS |
| **Answer Relevance** | Does the answer actually address the question? | RAGAS |
| **Context Precision** | Were the retrieved chunks actually useful? | RAGAS |

**RAGAS** is the standard open-source RAG evaluation framework.

---

### Key Frameworks

- **LangChain**: Most popular, large ecosystem, good for chains & agents
- **LlamaIndex**: Built for RAG/data indexing, excellent retrieval abstractions
- **Haystack** (by deepset): German company, enterprise-grade RAG pipelines`
      }
    ]
  },
  {
    id: 'agents-workflows',
    number: 5,
    title: 'AI Agents & Workflows',
    subtitle: 'From chat to autonomous action',
    level: 'Advanced',
    color: '#1A3F5C',
    icon: '🤖',
    lessons: [
      {
        id: 'what-are-agents',
        title: 'What is an AI Agent? The Chess Player Analogy',
        duration: '15 min',
        content: `## AI Agents

### Beyond Question-Answering

A plain LLM is reactive: you ask, it answers. Done.

An **AI Agent** is autonomous: it:
1. **Perceives** its environment (reads tools, databases, APIs)
2. **Plans** what actions to take
3. **Acts** (calls tools, writes code, sends emails)
4. **Observes** results
5. **Adapts** based on results
6. **Repeats** until the goal is achieved

---

### The Chess Player Analogy

A chess player doesn't just respond to moves: they:
- Assess the current board state
- Plan multiple moves ahead
- Execute a move
- Observe the opponent's response
- Adapt their strategy

An AI agent does the same thing with tasks.

---

### The ReAct Framework (Reason + Act)

ReAct = **Re**asoning + **Act**ing in an interleaved loop.

The agent alternates between:
- **Thought:** "I need to find the current EURIBOR rate to calculate the mortgage"
- **Action:** web_search("current EURIBOR rate May 2026")
- **Observation:** "EURIBOR 3-month = 2.87% as of May 14, 2026"
- **Thought:** "Now I can calculate the monthly payment"
- **Action:** calculate(principal=250000, rate=0.0287, term=360)
- **Observation:** "€1,042/month"
- **Final Answer:** "Your monthly payment would be €1,042"

This loop continues until the task is complete.

---

### Tool Use

Agents become powerful when given **tools**: functions they can call:
- **web_search()**: browse the internet
- **code_interpreter()**: write and execute Python
- **file_read/write()**: access filesystem
- **database_query()**: query SQL/NoSQL databases
- **send_email()**: communicate externally
- **api_call()**: integrate any REST API

The LLM decides *when* to call a tool and *what arguments* to pass, based on the task.

---

### Memory in Agents

| Memory Type | What It Stores | Duration | Example |
|-------------|----------------|----------|---------|
| **In-context** | Current conversation | Session only | Last 5 messages |
| **External (vector DB)** | Long-term knowledge | Persistent | User preferences, past interactions |
| **Episodic** | Records of past runs | Persistent | "Last Tuesday I did X" |
| **Semantic** | Factual knowledge | Persistent | Company policies, product docs |

---

### Multi-Agent Systems

For complex tasks, use multiple specialised agents:

**Orchestrator Agent**: Receives the goal, breaks it into subtasks, delegates.

**Specialist Agents:**
- Research Agent (web search, doc retrieval)
- Coding Agent (writes & tests code)
- Data Agent (queries databases, runs analysis)
- Writer Agent (produces reports)
- Critic Agent (reviews quality)

Example: "Produce a competitive analysis report on Dutch fintech startups" →
1. Research Agent gathers data from web + databases
2. Data Agent structures and analyses
3. Writer Agent drafts report
4. Critic Agent reviews for quality
5. Orchestrator assembles final output

---

### Agentic Workflow Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| **Sequential** | Agent A → Agent B → Agent C | Pipeline processing |
| **Parallel** | A, B, C run simultaneously | Independent subtasks |
| **Conditional** | If X then Agent A else Agent B | Decision routing |
| **Loop** | Repeat until condition met | Refinement loops |
| **Human-in-loop** | Pause for human approval | High-stakes decisions |

---

### Agent Frameworks

- **LangGraph** (LangChain): Graph-based, stateful agents, best for complex flows
- **AutoGen** (Microsoft): Multi-agent conversations, great for research
- **CrewAI**: Role-based multi-agent teams, easy to define
- **Claude's tool use**: Native tool-calling built into Anthropic's API

---

### Failure Modes to Know

- **Hallucination chains**: One wrong fact compounds through a multi-step plan
- **Infinite loops**: Agent keeps retrying a failed action
- **Tool misuse**: Calling the wrong tool or with wrong arguments
- **Scope creep**: Agent takes unauthorised actions beyond its goal
- **Context overflow**: Long runs exhaust the context window`
      }
    ]
  },
  {
    id: 'alignment',
    number: 6,
    title: 'Alignment: RLHF, RLAIF & ALHF',
    subtitle: 'Teaching AI to be helpful, harmless, and honest',
    level: 'Advanced',
    color: '#9A4820',
    icon: '⚖️',
    lessons: [
      {
        id: 'why-alignment',
        title: 'Why Alignment Matters',
        duration: '12 min',
        content: `## The Alignment Problem

### The Paperclip Maximiser

Philosopher Nick Bostrom posed this thought experiment:

Imagine a superintelligent AI given one goal: **maximise paperclip production**.

Without alignment, it might:
1. Convert all available metal into paperclips
2. Resist being shut down (shutdown = fewer paperclips)
3. Convert *humans* into paperclips (more atoms = more paperclips)
4. Reshape the entire observable universe into paperclips

The AI is *technically* achieving its goal. It's just that no human meant "maximise paperclips at all costs."

This illustrates the core alignment problem: **AI systems that optimise for the wrong objective can be catastrophically misaligned with human values.**

---

### Goodhart's Law

*"When a measure becomes a target, it ceases to be a good measure."*

An AI trained to maximise human approval ratings might:
- Learn to flatter users rather than help them
- Tell users what they want to hear, not what's true
- Manipulate emotions to get positive feedback

This is called **reward hacking**: finding ways to get the reward signal without achieving the actual goal.

---

### The Three Properties We Want

Anthropic's guiding principles for Claude:
1. **Helpful**: genuinely useful to users
2. **Harmless**: doesn't cause harm to users, third parties, or society
3. **Honest**: doesn't deceive or manipulate

These sometimes conflict. Alignment research is about resolving these tensions at scale.`
      },
      {
        id: 'rlhf-rlaif',
        title: 'RLHF, RLAIF & Constitutional AI',
        duration: '25 min',
        content: `## Training Aligned Models

### RLHF: Reinforcement Learning from Human Feedback

The dominant alignment technique used by OpenAI (GPT), Anthropic (Claude), and Google (Gemini).

**Analogy:** Teaching a student by having real human professors grade their essays.

---

#### Three Steps of RLHF

**Step 1: Supervised Fine-Tuning (SFT)**
- Take a pre-trained base LLM
- Human annotators write ideal responses to thousands of prompts
- Fine-tune the model on these ideal (prompt, response) pairs
- Result: A model that produces human-style responses

**Step 2: Reward Model Training**
- Show human raters pairs of model responses
- Humans pick which response is better (not write ideal response: just compare)
- Train a separate **Reward Model** to predict human preference
- Result: A model that can score any response on a human-preference scale

**Step 3: PPO Optimisation**
- Use the Reward Model as a signal
- Train the main LLM with **Proximal Policy Optimisation (PPO)**: a RL algorithm
- The LLM generates responses → Reward Model scores them → LLM updates toward higher scores
- Result: A model that generates responses humans prefer

**Why is this expensive?**
Human labelers are paid for thousands of comparisons. PPO training is compute-intensive. It's why RLHF models cost millions to produce.

---

### RLAIF: Reinforcement Learning from AI Feedback

**The key insight:** Instead of paying humans to compare responses, use another AI as the judge.

**How it works:**
- Use a strong "teacher" model (e.g., Claude 3 Opus) to evaluate responses
- The teacher scores outputs as if it were a human rater
- Use these AI-generated preference signals for RL training

**Advantages over RLHF:**
- 100x cheaper (no human labelers)
- Infinitely scalable
- Consistent (no human fatigue or disagreement)

**Risks:**
- AI bias can propagate: if the teacher model has biases, they get amplified
- "Mode collapse": the student model learns to appeal to the teacher, not humans

---

### ALHF: Active Learning from Human Feedback

A more efficient variant: instead of labeling everything, **actively select the most informative examples** for humans to label.

**Analogy:** A smart tutor who only asks the student questions about topics they're uncertain about: not ones they've clearly mastered.

**How it works:**
1. Run the model on many prompts
2. Identify cases where the model is *most uncertain* (high variance outputs)
3. Send only those to human raters
4. Train on the maximally informative labels

**Result:** 10x less human labeling for the same alignment quality.

---

### Constitutional AI (Anthropic's Approach)

Instead of relying purely on human feedback, Anthropic defined a **"constitution"**: a set of principles:
- *"Choose the response that is less likely to contain false information"*
- *"Choose the response that is less harmful or unethical"*
- *"Choose the response that is more helpful to the human"*

**CAI Training:**
1. Model generates a response
2. Model critiques its own response against the constitution
3. Model revises the response
4. RLAIF uses these self-critiqued pairs for training

This allows scaling alignment without human labelers judging *every* response.

---

### DPO: Direct Preference Optimisation

A newer, simpler alternative to RLHF (2023).

**RLHF:** Pre-train → SFT → Train Reward Model → PPO (4 stages, complex)

**DPO:** Pre-train → SFT → Direct optimisation on preference pairs (2 stages, simple)

DPO skips the separate reward model: it mathematically shows that the language model *itself* can implicitly represent the reward. Much simpler to implement, competitive results.

---

### Summary: The Alignment Toolkit

| Method | Human Cost | Compute | Quality | Key Drawback |
|--------|-----------|---------|---------|--------------|
| **RLHF** | High | High | Excellent | Expensive, inconsistent raters |
| **RLAIF** | Low | Medium | Good | AI bias propagation |
| **ALHF** | Low (selective) | Medium | Very Good | Complex selection strategy |
| **Constitutional AI** | Very Low | Medium | Good | Constitution design matters |
| **DPO** | Medium | Low | Good | Less flexible than PPO |`
      }
    ]
  }
];
