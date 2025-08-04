# BibTeX Comparison Report

## Summary

- **Total entries in _bibliography/papers.bib**: 30
- **Total entries in extras/bibtex**: 42
- **Entries in extras/bibtex but missing from _bibliography/papers.bib**: 17
- **Entries in _bibliography/papers.bib but not in extras/bibtex**: 5

## Detailed Analysis

### 1. Entries Present in extras/bibtex but Missing from _bibliography/papers.bib

The following entries need to be added to _bibliography/papers.bib:

#### Academic Papers (3 entries)
1. **muhamed2024eacl** - "Less is Fed More: Sparsity Reduces Feature Distortion in Federated Learning" (EACL 2024 workshop)
2. **muhamed2024icml** - "Grass: Compute Efficient Low-Memory LLM Training with Structured Sparse Gradients" (ICML workshop)
3. **muhamed2024neuripsworkshop** - "Decoding Dark Matter: Specialized Sparse Autoencoders for Interpreting Rare Concepts in LLMs" (NeurIPS ATTRIB 2024 workshop)
4. **muhamedtransformereval** - "Symbolic Music Generation with Transformer-GANs" (ISMIR NLP4MusA workshop 2020)

#### Blog Posts & Educational Resources (2 entries)
5. **blog** - "Using Transformers to create music in AWS DeepComposer Music studio"
6. **ar-cnn** - "Generating compositions in the style of Bach using the AR-CNN algorithm in AWS DeepComposer"

#### Code Repositories (2 entries)
7. **codebase1** - AWS Deepcomposer code repository
8. **codebase2** - Transformer-GAN code repository

#### AWS Products (2 entries)
9. **awsdeepcomposer** - AWS DeepComposer product page
10. **awsdeeplens** - AWS Deeplens product page

#### Press Coverage (5 entries)
11. **article1** - TechCrunch article about DeepComposer
12. **article2** - Fact Magazine article about AWS DeepComposer
13. **article3** - GritDaily article about DeepComposer
14. **article4** - Engadget article about DeepComposer
15. **article5** - YouTube video of Jonathan Coulton Performance at AWS re:Invent 2019

### 2. Entries with Different Citation Keys but Same Paper

The following entries appear to be the same paper with different citation keys:

1. **akter2023depth** (extras) vs **akter2023indepth** (papers.bib)
   - Same paper: "An In-depth Look at Gemini's Language Abilities"
   - Recommendation: Use consistent key (suggest: akter2023indepth)

2. **nigam2019semantic** (extras) vs **muhamed2023web** (papers.bib)
   - Same paper: "Web-scale Semantic Product Search With Large Language Models"
   - Recommendation: Use consistent key (suggest: muhamed2023web since it follows naming convention)

### 3. Entries Present in _bibliography/papers.bib but Not in extras/bibtex

These entries exist in papers.bib but are missing from extras/bibtex:

1. **muhamed2024iclr** - "Fed Up with Complexity: Simplifying Many-Task Federated Learning with NTKFedAvg"
2. **muhamed2024iclr2** - "Cache Me If You Can: The Case For Retrieval Augmentation in Federated Learning"

Note: These appear to be duplicated in papers.bib (entries appear twice) but correctly appear once each in extras/bibtex.

### 4. Duplicate Entries

#### In _bibliography/papers.bib:
- **muhamed2024iclr** and **muhamed2024iclr2** appear twice each in the file

#### In extras/bibtex:
- No duplicates found

## Recommendations

1. **Add missing academic papers** from extras/bibtex to _bibliography/papers.bib:
   - muhamed2024eacl
   - muhamed2024icml
   - muhamed2024neuripsworkshop
   - muhamedtransformereval

2. **Standardize citation keys** for papers that appear with different keys:
   - Use akter2023indepth consistently
   - Use muhamed2023web consistently

3. **Remove duplicate entries** in _bibliography/papers.bib:
   - Remove the duplicate muhamed2024iclr entry
   - Remove the duplicate muhamed2024iclr2 entry

4. **Consider whether to include** non-academic entries (blog posts, press articles, code repositories) in _bibliography/papers.bib, as these are currently only in extras/bibtex.

5. **Update formatting** to ensure consistency between the two files (e.g., author name formatting, use of \textbf{} vs plain text).