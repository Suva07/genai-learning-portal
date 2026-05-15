export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Token", category: "LLM Basics", definition: "The basic unit of text that LLMs process. Roughly 3/4 of a word on average. 'unbelievable' = 3 tokens. Models are priced per token and have token-based context limits." },
  { term: "Embedding", category: "Vectors", definition: "A numerical representation (vector) of data (text, image, etc.) that captures semantic meaning. Similar items have similar embeddings. Foundation of semantic search and RAG." },
  { term: "Vector", category: "Vectors", definition: "A list of numbers (e.g., [0.12, -0.45, 0.87, ...]). In AI, vectors represent the 'meaning coordinates' of text or images in a high-dimensional space." },
  { term: "Cosine Similarity", category: "Vectors", definition: "A measure of similarity between two vectors based on the angle between them. 1.0 = identical, 0 = unrelated, -1 = opposite. Used to find similar embeddings in vector search." },
  { term: "Transformer", category: "Architecture", definition: "The neural network architecture introduced in 2017 ('Attention Is All You Need') that powers all modern LLMs. Key innovation: self-attention allows every token to attend to every other token in parallel." },
  { term: "Attention", category: "Architecture", definition: "The mechanism in Transformers that allows each token to 'pay attention' to other tokens. Self-attention captures contextual relationships across the full input sequence simultaneously." },
  { term: "Fine-tuning", category: "Training", definition: "Continuing to train a pre-trained model on a smaller, domain-specific dataset to specialise its behaviour. More expensive than prompting but produces better domain performance." },
  { term: "RAG", category: "Retrieval", definition: "Retrieval Augmented Generation. A technique that enhances LLM responses by retrieving relevant external documents at query time and injecting them into the prompt context. Reduces hallucination." },
  { term: "Chunking", category: "Retrieval", definition: "Splitting documents into smaller pieces before embedding and storing in a vector DB. Chunk size and overlap are critical hyperparameters. Too small = lost context. Too large = diluted relevance." },
  { term: "Reranking", category: "Retrieval", definition: "A second-stage retrieval step where a more accurate (but slower) cross-encoder model re-scores candidates returned by fast vector search. Improves precision significantly." },
  { term: "Agent", category: "Agents", definition: "An AI system that autonomously perceives its environment, plans, uses tools, takes actions, and iterates until a goal is achieved. Goes beyond single-turn question answering." },
  { term: "ReAct", category: "Agents", definition: "Reasoning + Acting. A prompting framework where agents interleave Thought → Action → Observation steps. The model reasons about what to do, acts, observes results, and loops." },
  { term: "RLHF", category: "Alignment", definition: "Reinforcement Learning from Human Feedback. Training paradigm: 1) SFT on human demonstrations, 2) Train reward model from human comparisons, 3) Optimise LLM with PPO using reward model signal." },
  { term: "RLAIF", category: "Alignment", definition: "Reinforcement Learning from AI Feedback. Uses a strong AI model as the evaluator instead of humans. Cheaper and more scalable than RLHF but risks propagating AI biases." },
  { term: "ALHF", category: "Alignment", definition: "Active Learning from Human Feedback. Selects the most uncertain/informative examples for human labeling, reducing annotation cost while maintaining alignment quality." },
  { term: "Constitutional AI", category: "Alignment", definition: "Anthropic's alignment approach: define a 'constitution' of principles, then train the model to critique and revise its own outputs against those principles, reducing need for human labelers." },
  { term: "DPO", category: "Alignment", definition: "Direct Preference Optimisation. A simpler alternative to RLHF that skips the separate reward model, directly optimising the LLM on preference pairs. Less complex, competitive results." },
  { term: "Hallucination", category: "LLM Basics", definition: "When an LLM generates plausible-sounding but factually incorrect information with false confidence. A critical failure mode. RAG and grounding techniques reduce hallucinations." },
  { term: "Temperature", category: "LLM Basics", definition: "A parameter (0–2) controlling output randomness. Low temperature (≈0) = deterministic and factual. High temperature (≈1.5) = creative and diverse. Controls the sampling distribution." },
  { term: "Top-P", category: "LLM Basics", definition: "Nucleus sampling parameter (0–1). Only sample from the smallest set of tokens whose cumulative probability exceeds P. Cuts off unlikely tokens while preserving natural diversity." },
  { term: "Context Window", category: "LLM Basics", definition: "The maximum number of tokens an LLM can process in one call (input + output). Think of it as working memory. Claude: 200K, GPT-4 Turbo: 128K, Gemini 1.5 Pro: 2M tokens." },
  { term: "Prompt Engineering", category: "Techniques", definition: "The craft of designing prompts to reliably elicit desired LLM behaviour. Includes zero-shot, few-shot, chain-of-thought, role prompting, and structured output techniques." },
  { term: "Zero-shot", category: "Techniques", definition: "Prompting an LLM to perform a task without any examples. Just instructions, no demonstrations. Relies entirely on the model's pre-trained knowledge. 'Translate this to Dutch: ...'" },
  { term: "Few-shot", category: "Techniques", definition: "Including 2–5 input/output examples in the prompt to guide the model. Shows the model the desired format and style without retraining. Very effective for structured tasks." },
  { term: "Chain-of-thought", category: "Techniques", definition: "Prompting the model to reason step-by-step before giving a final answer. 'Let's think step by step...' significantly improves accuracy on reasoning tasks by externalising the reasoning process." },
  { term: "Semantic Search", category: "Retrieval", definition: "Finding documents based on meaning rather than exact keyword matches. Uses embeddings and cosine similarity. 'feline pet' matches 'cat care' even without shared words." },
  { term: "BM25", category: "Retrieval", definition: "Best Match 25. A classic term-frequency-based ranking algorithm. Strong for exact keyword matches. Often combined with vector search in hybrid retrieval systems." },
  { term: "Hybrid Search", category: "Retrieval", definition: "Combining BM25 (keyword) and vector (semantic) search using score fusion (e.g., Reciprocal Rank Fusion). Gets the best of both: exact matches + semantic understanding." },
  { term: "LangChain", category: "Frameworks", definition: "The most popular open-source framework for building LLM applications. Provides chains, agents, document loaders, vector store integrations, and a large ecosystem of tools." },
  { term: "LlamaIndex", category: "Frameworks", definition: "A data framework specifically designed for connecting LLMs to external data. Excels at RAG pipelines, document indexing, and retrieval abstractions." },
  { term: "Orchestrator", category: "Agents", definition: "In multi-agent systems, the agent responsible for breaking down goals, delegating tasks to specialist agents, and assembling the final output. The 'manager' of the agent team." },
  { term: "Multi-agent", category: "Agents", definition: "A system of multiple AI agents that collaborate to solve complex tasks. Each agent may specialise in different capabilities. Enables parallelism and separation of concerns." },
  { term: "SFT", category: "Training", definition: "Supervised Fine-Tuning. First step of RLHF: fine-tune a base model on curated human demonstrations of ideal behaviour. Creates the foundation model for further alignment training." },
  { term: "PPO", category: "Training", definition: "Proximal Policy Optimisation. The reinforcement learning algorithm typically used in the RLHF training loop to update the LLM toward higher-scoring (more aligned) responses." },
  { term: "HyDE", category: "Retrieval", definition: "Hypothetical Document Embeddings. An advanced RAG technique: ask the LLM to generate a hypothetical answer, then embed that instead of the question. Hypothetical answers are closer in embedding space to real documents." },
];
